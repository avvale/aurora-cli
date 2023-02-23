import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindRefreshTokenResolver
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenHandler,
    ) {}

    @Query('oAuthFindRefreshToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}