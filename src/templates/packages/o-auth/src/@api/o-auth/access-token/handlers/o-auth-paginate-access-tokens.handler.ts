import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateAccessTokensQuery } from '../../../../@apps/o-auth/access-token/application/paginate/paginate-access-tokens.query';
import { Pagination } from '../../../../graphql';

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
        return await this.queryBus.ask(new PaginateAccessTokensQuery(queryStatement, constraint, { timezone }));
    }
}