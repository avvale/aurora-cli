import { OAuthAccessToken } from '@api/graphql';
import { OAuthGetAccessTokensHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthGetAccessTokensResolver {
    constructor(private readonly handler: OAuthGetAccessTokensHandler) {}

    @Query('oAuthGetAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
