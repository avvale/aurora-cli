import { OAuthScope } from '@api/graphql';
import { OAuthFindScopeByIdHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthFindScopeByIdResolver {
    constructor(private readonly handler: OAuthFindScopeByIdHandler) {}

    @Query('oAuthFindScopeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope> {
        return await this.handler.main(id, constraint, timezone);
    }
}
