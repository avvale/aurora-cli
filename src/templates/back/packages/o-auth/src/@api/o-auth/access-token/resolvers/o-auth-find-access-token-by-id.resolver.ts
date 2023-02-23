import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindAccessTokenByIdHandler } from '../handlers/o-auth-find-access-token-by-id.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindAccessTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthFindAccessTokenByIdHandler,
    ) {}

    @Query('oAuthFindAccessTokenById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}