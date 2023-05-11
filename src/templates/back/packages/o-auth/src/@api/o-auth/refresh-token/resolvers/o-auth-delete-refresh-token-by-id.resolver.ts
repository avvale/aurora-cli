import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';
import { OAuthRefreshToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokenByIdHandler,
    ) {}

    @Mutation('oAuthDeleteRefreshTokenById')
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