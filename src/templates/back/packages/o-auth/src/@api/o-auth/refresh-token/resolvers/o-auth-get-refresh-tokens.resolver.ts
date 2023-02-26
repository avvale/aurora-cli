import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetRefreshTokensHandler } from '../handlers/o-auth-get-refresh-tokens.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthGetRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthGetRefreshTokensHandler,
    ) {}

    @Query('oAuthGetRefreshTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}