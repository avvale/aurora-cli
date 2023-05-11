import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';

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