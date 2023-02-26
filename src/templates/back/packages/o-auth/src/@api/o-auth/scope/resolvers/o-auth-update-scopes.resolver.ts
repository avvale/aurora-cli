import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';
import { OAuthScope, OAuthUpdateScopesInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.update')
export class OAuthUpdateScopesResolver
{
    constructor(
        private readonly handler: OAuthUpdateScopesHandler,
    ) {}

    @Mutation('oAuthUpdateScopes')
    async main(
        @Args('payload') payload: OAuthUpdateScopesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}