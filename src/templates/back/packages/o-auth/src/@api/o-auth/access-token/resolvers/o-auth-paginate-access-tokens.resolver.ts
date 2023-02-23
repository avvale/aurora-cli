import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthPaginateAccessTokensHandler } from '../handlers/o-auth-paginate-access-tokens.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthPaginateAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthPaginateAccessTokensHandler,
    ) {}

    @Query('oAuthPaginateAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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