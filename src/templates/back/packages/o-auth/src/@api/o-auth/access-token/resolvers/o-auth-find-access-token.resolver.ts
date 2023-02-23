import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindAccessTokenHandler } from '../handlers/o-auth-find-access-token.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindAccessTokenResolver
{
    constructor(
        private readonly handler: OAuthFindAccessTokenHandler,
    ) {}

    @Query('oAuthFindAccessToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}