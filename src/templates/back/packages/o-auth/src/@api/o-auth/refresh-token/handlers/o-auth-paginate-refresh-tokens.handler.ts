import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateRefreshTokensQuery } from '@app/o-auth/refresh-token/application/paginate/paginate-refresh-tokens.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class OAuthPaginateRefreshTokensHandler
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
        return await this.queryBus.ask(new PaginateRefreshTokensQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}