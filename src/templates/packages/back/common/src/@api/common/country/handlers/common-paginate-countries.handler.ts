import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateCountriesQuery } from '@apps/common/country/application/paginate/paginate-countries.query';
import { Pagination } from 'src/graphql';

@Injectable()
export class CommonPaginateCountriesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<Pagination>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        return await this.queryBus.ask(new PaginateCountriesQuery(queryStatement, constraint, { timezone }));
    }
}