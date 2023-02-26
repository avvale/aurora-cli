import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';
import { OAuthScope, OAuthCreateScopeInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.create')
export class OAuthCreateScopeResolver
{
    constructor(
        private readonly handler: OAuthCreateScopeHandler,
    ) {}

    @Mutation('oAuthCreateScope')
    async main(
        @Args('payload') payload: OAuthCreateScopeInput,
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