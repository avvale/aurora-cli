import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';
import { OAuthCreateScopeInput } from '@api/graphql';

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