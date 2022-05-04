import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
export class OAuthDeleteScopesResolver
{
    constructor(
        private readonly handler: OAuthDeleteScopesHandler,
    ) {}

    @Mutation('oAuthDeleteScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}