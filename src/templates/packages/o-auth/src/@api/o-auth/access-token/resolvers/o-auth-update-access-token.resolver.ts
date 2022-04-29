import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthUpdateAccessTokenHandler } from '../handlers/o-auth-update-access-token.handler';
import { OAuthAccessToken, OAuthUpdateAccessTokenInput } from '../../../../graphql';

@Resolver()
export class OAuthUpdateAccessTokenResolver
{
    constructor(
        private readonly handler: OAuthUpdateAccessTokenHandler,
    ) {}

    @Mutation('oAuthUpdateAccessToken')
    async main(
        @Args('payload') payload: OAuthUpdateAccessTokenInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}