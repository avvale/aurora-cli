import { CommonCountryDto, CommonUpdateCountriesDto } from '@api/common/country';
import { CommonCountry, CommonUpdateCountriesInput } from '@api/graphql';
import { CommonGetCountriesQuery, CommonUpdateCountriesCommand } from '@app/common/country';
import { AuditingMeta, CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetSearchKeyLangService, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetContentLanguageObjectService: CoreGetContentLanguageObjectService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
    ) {}

    async main(
        payload: CommonUpdateCountriesInput | CommonUpdateCountriesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        if (!contentLanguage) throw new BadRequestException('To update a multi-language objects, the content-language header must be defined.');

        await this.commandBus.dispatch(new CommonUpdateCountriesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
                meta: {
                    contentLanguage: await this.coreGetContentLanguageObjectService.get(contentLanguage),
                },
            },
        ));

        constraint = await this.coreAddI18nConstraintService.add(
            {},
            'countryI18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        return await this.queryBus.ask(new CommonGetCountriesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
