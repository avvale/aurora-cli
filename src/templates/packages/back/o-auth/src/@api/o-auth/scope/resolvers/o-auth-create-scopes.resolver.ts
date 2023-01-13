import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';
import { OAuthCreateScopeInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateScopesResolver
{
    constructor(
        private readonly handler: OAuthCreateScopesHandler,
    ) {}

    @Mutation('oAuthCreateScopes')
    async main(
        @Args('payload') payload: OAuthCreateScopeInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}