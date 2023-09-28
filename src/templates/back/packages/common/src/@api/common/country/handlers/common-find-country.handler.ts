import { CommonCountryDto } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { CommonFindCountryQuery } from '@app/common/country';
import { CoreAddI18nConstraintService, CoreGetSearchKeyLangService, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindCountryHandler
{
    i18nColumns: string[] = ['name', 'slug', 'administrativeAreaLevel1', 'administrativeAreaLevel2', 'administrativeAreaLevel3'];
    i18nRelationship: string = 'countryI18n';
    i18nFunctionReplace = (key: string): string => this.i18nColumns.includes(key) ? `$${this.i18nRelationship}.${key}$` : key;

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
    ): Promise<CommonCountry | CommonCountryDto>
    {
        if (!contentLanguage) throw new BadRequestException('To find a multi-language object, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            this.i18nRelationship,
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        // Replace all i18n keys by $countryI18n.key$
        queryStatement = Utils.deepMapKeys(queryStatement, this.i18nFunctionReplace);
        constraint = Utils.deepMapKeys(constraint, this.i18nFunctionReplace);

        return await this.queryBus.ask(new CommonFindCountryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
