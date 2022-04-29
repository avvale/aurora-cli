import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthPaginateAccessTokensHandler } from '../handlers/o-auth-paginate-access-tokens.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class OAuthPaginateAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthPaginateAccessTokensHandler,
    ) {}

    @Query('oAuthPaginateAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}