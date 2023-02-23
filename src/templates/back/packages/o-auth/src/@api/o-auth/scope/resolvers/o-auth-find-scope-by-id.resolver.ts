import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthFindScopeByIdHandler,
    ) {}

    @Query('oAuthFindScopeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}