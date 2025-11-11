import { OAuthCreateScopeInput, OAuthScope } from '@api/graphql';
import { OAuthCreateScopeHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.create')
export class OAuthCreateScopeResolver {
    constructor(private readonly handler: OAuthCreateScopeHandler) {}

    @Mutation('oAuthCreateScope')
    async main(
        @Args('payload') payload: OAuthCreateScopeInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
