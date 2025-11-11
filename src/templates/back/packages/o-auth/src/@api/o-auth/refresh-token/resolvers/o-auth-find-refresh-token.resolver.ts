import { OAuthRefreshToken } from '@api/graphql';
import { OAuthFindRefreshTokenHandler } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthFindRefreshTokenResolver {
    constructor(private readonly handler: OAuthFindRefreshTokenHandler) {}

    @Query('oAuthFindRefreshToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
