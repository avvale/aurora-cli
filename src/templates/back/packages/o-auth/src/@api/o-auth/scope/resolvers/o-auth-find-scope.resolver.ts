import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindScopeHandler } from '../handlers/o-auth-find-scope.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthFindScopeResolver
{
    constructor(
        private readonly handler: OAuthFindScopeHandler,
    ) {}

    @Query('oAuthFindScope')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}