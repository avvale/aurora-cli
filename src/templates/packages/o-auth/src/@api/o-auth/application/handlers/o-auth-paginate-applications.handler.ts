import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateApplicationsQuery } from '../../../../@apps/o-auth/application/application/paginate/paginate-applications.query';
import { Pagination } from '../../../../../graphql';

@Injectable()
export class OAuthPaginateApplicationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateApplicationsQuery(queryStatement, constraint, { timezone }));
    }
}