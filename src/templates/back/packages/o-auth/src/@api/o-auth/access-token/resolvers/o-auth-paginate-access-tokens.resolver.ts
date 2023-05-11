import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthPaginateAccessTokensHandler } from '../handlers/o-auth-paginate-access-tokens.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthPaginateAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthPaginateAccessTokensHandler,
    ) {}

    @Query('oAuthPaginateAccessTokens')
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