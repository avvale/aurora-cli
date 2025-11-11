import { OAuthRefreshToken } from '@api/graphql';
import { OAuthDeleteRefreshTokenByIdHandler } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokenByIdResolver {
    constructor(private readonly handler: OAuthDeleteRefreshTokenByIdHandler) {}

    @Mutation('oAuthDeleteRefreshTokenById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken> {
        return await this.handler.main(id, constraint, timezone);
    }
}
