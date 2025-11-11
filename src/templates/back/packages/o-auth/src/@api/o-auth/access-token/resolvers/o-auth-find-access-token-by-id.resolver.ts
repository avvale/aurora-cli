import { OAuthAccessToken } from '@api/graphql';
import { OAuthFindAccessTokenByIdHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenByIdResolver {
    constructor(private readonly handler: OAuthFindAccessTokenByIdHandler) {}

    @Query('oAuthFindAccessTokenById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken> {
        return await this.handler.main(id, constraint, timezone);
    }
}
