import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthDeleteRefreshTokensHandler } from '../handlers/o-auth-delete-refresh-tokens.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokensHandler,
    ) {}

    @Mutation('oAuthDeleteRefreshTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}