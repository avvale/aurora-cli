import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindScopeHandler } from '../handlers/o-auth-find-scope.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindScopeResolver
{
    constructor(
        private readonly handler: OAuthFindScopeHandler,
    ) {}

    @Query('oAuthFindScope')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}