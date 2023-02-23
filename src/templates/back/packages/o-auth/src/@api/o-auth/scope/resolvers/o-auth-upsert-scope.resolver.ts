import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpsertScopeResolver
{
    constructor(
        private readonly handler: OAuthUpsertScopeHandler,
    ) {}

    @Mutation('oAuthUpsertScope')
    async main(
        @Args('payload') payload: OAuthUpdateScopeByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}