import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthFindScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthFindScopeByIdHandler,
    ) {}

    @Query('oAuthFindScopeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}