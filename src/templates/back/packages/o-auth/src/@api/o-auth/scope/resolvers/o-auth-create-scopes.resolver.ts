import { OAuthCreateScopeInput } from '@api/graphql';
import { OAuthCreateScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.create')
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
