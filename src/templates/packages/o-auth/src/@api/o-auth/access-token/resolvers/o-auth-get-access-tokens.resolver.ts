import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthGetAccessTokensHandler } from '../handlers/o-auth-get-access-tokens.handler';
import { OAuthAccessToken } from '../../../../graphql';

@Resolver()
export class OAuthGetAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthGetAccessTokensHandler,
    ) {}

    @Query('oAuthGetAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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