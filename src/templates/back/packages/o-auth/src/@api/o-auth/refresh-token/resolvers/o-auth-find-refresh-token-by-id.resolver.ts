import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindRefreshTokenByIdHandler } from '../handlers/o-auth-find-refresh-token-by-id.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthFindRefreshTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenByIdHandler,
    ) {}

    @Query('oAuthFindRefreshTokenById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}