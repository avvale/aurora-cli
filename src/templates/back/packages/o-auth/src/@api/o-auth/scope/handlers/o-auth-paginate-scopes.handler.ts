import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateScopesQuery } from '@app/o-auth/scope/application/paginate/paginate-scopes.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class OAuthPaginateScopesHandler
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
        return await this.queryBus.ask(new PaginateScopesQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}