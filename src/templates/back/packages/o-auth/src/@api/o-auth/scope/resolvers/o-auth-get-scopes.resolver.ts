import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthGetScopesResolver
{
    constructor(
        private readonly handler: OAuthGetScopesHandler,
    ) {}

    @Query('oAuthGetScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}