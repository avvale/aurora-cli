import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthDeleteAccessTokensHandler } from '../handlers/o-auth-delete-access-tokens.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Permissions('oAuth.accessToken.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthDeleteAccessTokensHandler,
    ) {}

    @Mutation('oAuthDeleteAccessTokens')
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