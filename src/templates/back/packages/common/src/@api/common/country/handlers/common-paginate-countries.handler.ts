import { Pagination } from '@api/graphql';
import { CommonPaginateCountriesQuery } from '@app/common/country';
import { CoreAddI18nConstraintService, CoreGetSearchKeyLangService, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateCountriesHandler
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
    ): Promise<Pagination>
    {
        if (!contentLanguage) throw new BadRequestException('To paginate a multi-language objects, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            'countryI18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        return await this.queryBus.ask(new CommonPaginateCountriesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
