import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteAccessTokensHandler } from '../handlers/o-auth-delete-access-tokens.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.accessToken.delete')
export class OAuthDeleteAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthDeleteAccessTokensHandler,
    ) {}

    @Mutation('oAuthDeleteAccessTokens')
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