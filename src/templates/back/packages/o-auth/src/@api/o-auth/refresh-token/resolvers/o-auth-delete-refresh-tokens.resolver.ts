import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteRefreshTokensHandler } from '../handlers/o-auth-delete-refresh-tokens.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokensHandler,
    ) {}

    @Mutation('oAuthDeleteRefreshTokens')
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