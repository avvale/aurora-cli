import { OAuthScope, OAuthUpdateScopesInput } from '@api/graphql';
import { OAuthUpdateScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
