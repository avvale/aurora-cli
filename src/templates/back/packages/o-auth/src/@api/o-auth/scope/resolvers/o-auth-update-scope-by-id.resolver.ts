import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthUpdateScopeByIdHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
