import { OAuthRefreshToken } from '@api/graphql';
import { OAuthDeleteRefreshTokensHandler } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokensResolver {
    constructor(private readonly handler: OAuthDeleteRefreshTokensHandler) {}

    @Mutation('oAuthDeleteRefreshTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
