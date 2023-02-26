import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateAccessTokensQuery } from '@app/o-auth/access-token/application/paginate/paginate-access-tokens.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class OAuthPaginateAccessTokensHandler
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
        return await this.queryBus.ask(new PaginateAccessTokensQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}