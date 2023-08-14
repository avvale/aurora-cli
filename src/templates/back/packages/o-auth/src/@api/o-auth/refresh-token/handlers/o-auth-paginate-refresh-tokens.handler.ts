import { Pagination } from '@api/graphql';
import { OAuthPaginateRefreshTokensQuery } from '@app/o-auth/refresh-token';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new OAuthPaginateRefreshTokensQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
