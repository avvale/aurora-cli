import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateRefreshTokensQuery } from '../../../../@apps/o-auth/refresh-token/application/paginate/paginate-refresh-tokens.query';
import { Pagination } from '../../../../../graphql';

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
        return await this.queryBus.ask(new PaginateRefreshTokensQuery(queryStatement, constraint, { timezone }));
    }
}