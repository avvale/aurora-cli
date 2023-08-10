import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthUpsertScopeHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.upsert')
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
