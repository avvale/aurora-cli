import { CommonCountryDto, CommonCreateCountryDto } from '../dto';
import { CommonCountry, CommonCreateCountryInput } from '@api/graphql';
import { CommonCreateCountryCommand, CommonFindCountryByIdQuery } from '@app/common/country';
import { AuditingMeta, CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetFallbackLangService, CoreGetSearchKeyLangService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateCountryHandler
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
        payload: CommonCreateCountryInput | CommonCreateCountryDto,
        timezone?: string,
        contentLanguage?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        if (!contentLanguage) throw new BadRequestException('To create a multi-language object, the content-language header must be defined.');

        await this.commandBus.dispatch(new CommonCreateCountryCommand(
            payload,
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

        const constraint = await this.coreAddI18nConstraintService.add(
            {},
            'countryI18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        return await this.queryBus.ask(new CommonFindCountryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}