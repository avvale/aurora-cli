import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthUpdateRefreshTokenHandler } from '../handlers/o-auth-update-refresh-token.handler';
import { OAuthRefreshToken, OAuthUpdateRefreshTokenInput } from '../../../../graphql';

@Resolver()
export class OAuthUpdateRefreshTokenResolver
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokenHandler,
    ) {}

    @Mutation('oAuthUpdateRefreshToken')
    async main(
        @Args('payload') payload: OAuthUpdateRefreshTokenInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}