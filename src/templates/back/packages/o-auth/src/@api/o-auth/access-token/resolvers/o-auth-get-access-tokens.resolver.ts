import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthGetAccessTokensHandler } from '../handlers/o-auth-get-access-tokens.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthGetAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthGetAccessTokensHandler,
    ) {}

    @Query('oAuthGetAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}