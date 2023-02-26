import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthGetScopesResolver
{
    constructor(
        private readonly handler: OAuthGetScopesHandler,
    ) {}

    @Query('oAuthGetScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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