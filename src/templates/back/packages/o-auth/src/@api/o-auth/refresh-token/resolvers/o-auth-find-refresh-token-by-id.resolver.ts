import { OAuthRefreshToken } from '@api/graphql';
import { OAuthFindRefreshTokenByIdHandler } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.refreshToken.get')
export class OAuthFindRefreshTokenByIdResolver {
    constructor(private readonly handler: OAuthFindRefreshTokenByIdHandler) {}

    @Query('oAuthFindRefreshTokenById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken> {
        return await this.handler.main(id, constraint, timezone);
    }
}
