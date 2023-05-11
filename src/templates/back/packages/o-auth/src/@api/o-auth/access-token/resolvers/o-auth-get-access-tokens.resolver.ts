import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetAccessTokensHandler } from '../handlers/o-auth-get-access-tokens.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthGetAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthGetAccessTokensHandler,
    ) {}

    @Query('oAuthGetAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}