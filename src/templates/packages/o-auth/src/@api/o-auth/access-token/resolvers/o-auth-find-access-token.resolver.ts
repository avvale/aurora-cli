import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthFindAccessTokenHandler } from '../handlers/o-auth-find-access-token.handler';
import { OAuthAccessToken } from '../../../../graphql';

@Resolver()
export class OAuthFindAccessTokenResolver
{
    constructor(
        private readonly handler: OAuthFindAccessTokenHandler,
    ) {}

    @Query('oAuthFindAccessToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}