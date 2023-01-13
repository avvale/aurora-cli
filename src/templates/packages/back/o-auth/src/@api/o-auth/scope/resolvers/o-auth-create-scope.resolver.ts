import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';
import { OAuthScope, OAuthCreateScopeInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateScopeResolver
{
    constructor(
        private readonly handler: OAuthCreateScopeHandler,
    ) {}

    @Mutation('oAuthCreateScope')
    async main(
        @Args('payload') payload: OAuthCreateScopeInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}