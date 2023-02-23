import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';
import { OAuthCreateScopeInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateScopesResolver
{
    constructor(
        private readonly handler: OAuthCreateScopesHandler,
    ) {}

    @Mutation('oAuthCreateScopes')
    async main(
        @Args('payload') payload: OAuthCreateScopeInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}