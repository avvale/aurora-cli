import { Injectable } from '@nestjs/common';
import { AddI18nConstraintService, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateCountriesQuery } from '@app/common/country/application/paginate/paginate-countries.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class CommonPaginateCountriesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<Pagination>
    {
        constraint = await this.addI18nConstraintService.main(constraint, 'countryI18n', contentLanguage);
        return await this.queryBus.ask(new PaginateCountriesQuery(queryStatement, constraint, { timezone }));
    }
}