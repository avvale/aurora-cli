import { OAuthScope } from '@api/graphql';
import { OAuthDeleteScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopesResolver {
    constructor(private readonly handler: OAuthDeleteScopesHandler) {}

    @Mutation('oAuthDeleteScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
