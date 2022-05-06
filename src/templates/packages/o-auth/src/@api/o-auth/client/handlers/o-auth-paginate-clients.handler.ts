import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateClientsQuery } from '../../../../@apps/o-auth/client/application/paginate/paginate-clients.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class OAuthPaginateClientsHandler
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
        return await this.queryBus.ask(new PaginateClientsQuery(queryStatement, constraint, { timezone }));
    }
}