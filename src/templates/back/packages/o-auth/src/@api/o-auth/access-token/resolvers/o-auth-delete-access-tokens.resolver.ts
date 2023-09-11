import { OAuthAccessToken } from '@api/graphql';
import { OAuthDeleteAccessTokensHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
