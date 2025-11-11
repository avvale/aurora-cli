import { Pagination } from '@api/graphql';
import { OAuthPaginateRefreshTokensHandler } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthPaginateRefreshTokensResolver {
    constructor(private readonly handler: OAuthPaginateRefreshTokensHandler) {}

    @Query('oAuthPaginateRefreshTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
