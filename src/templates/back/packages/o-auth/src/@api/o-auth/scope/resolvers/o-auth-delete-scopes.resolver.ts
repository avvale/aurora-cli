import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopesResolver
{
    constructor(
        private readonly handler: OAuthDeleteScopesHandler,
    ) {}

    @Mutation('oAuthDeleteScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}