import { OAuthAccessToken } from '@api/graphql';
import { OAuthFindAccessTokenHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenResolver {
    constructor(private readonly handler: OAuthFindAccessTokenHandler) {}

    @Query('oAuthFindAccessToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
