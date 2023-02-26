import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthPaginateRefreshTokensHandler } from '../handlers/o-auth-paginate-refresh-tokens.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthPaginateRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthPaginateRefreshTokensHandler,
    ) {}

    @Query('oAuthPaginateRefreshTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}