import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateScopeByIdHandler } from '../handlers/o-auth-update-scope-by-id.handler';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.update')
export class OAuthUpdateScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateScopeByIdHandler,
    ) {}

    @Mutation('oAuthUpdateScopeById')
    async main(
        @Args('payload') payload: OAuthUpdateScopeByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}