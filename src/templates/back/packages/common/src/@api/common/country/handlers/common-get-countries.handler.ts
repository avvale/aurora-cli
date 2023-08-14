import { CommonCountryDto } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { CommonGetCountriesQuery } from '@app/common/country';
import { CoreAddI18nConstraintService, CoreGetSearchKeyLangService, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetCountriesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<CommonCountry[] | CommonCountryDto[]>
    {
        if (!contentLanguage) throw new BadRequestException('To get a multi-language objects, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            'countryI18n',
            contentLanguage,
            {
                searchKeyLang        : this.coreGetSearchKeyLangService.get(),
                defineDefaultLanguage: false,
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
