import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateClientsQuery } from '@app/o-auth/client/application/paginate/paginate-clients.query';
import { Pagination } from '@api/graphql';

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
        return await this.queryBus.ask(new PaginateClientsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}