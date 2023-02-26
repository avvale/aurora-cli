import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthFindRefreshTokenResolver
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenHandler,
    ) {}

    @Query('oAuthFindRefreshToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}