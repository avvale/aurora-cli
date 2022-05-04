import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
export class OAuthGetScopesResolver
{
    constructor(
        private readonly handler: OAuthGetScopesHandler,
    ) {}

    @Query('oAuthGetScopes')
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