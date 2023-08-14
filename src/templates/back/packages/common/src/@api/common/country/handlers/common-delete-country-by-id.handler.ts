import { CommonCountryDto } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { CommonDeleteCountryByIdCommand, CommonFindCountryByIdQuery } from '@app/common/country';
import { AuditingMeta, CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetFallbackLangService, CoreGetSearchKeyLangService, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteCountryByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetContentLanguageObjectService: CoreGetContentLanguageObjectService,
        private readonly coreGetFallbackLangService: CoreGetFallbackLangService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        if (!contentLanguage) throw new BadRequestException('To delete a multi-language object, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            'countryI18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        const country = await this.queryBus.ask(new CommonFindCountryByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteCountryByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
                meta: {
                    fallbackLang   : await this.coreGetFallbackLangService.get(),
                    contentLanguage: await this.coreGetContentLanguageObjectService.get(contentLanguage),
                },
            },
        ));

        return country;
    }
}
