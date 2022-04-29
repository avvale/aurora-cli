import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { OAuthCreateRefreshTokensHandler } from '../handlers/o-auth-create-refresh-tokens.handler';
import { OAuthCreateRefreshTokenInput } from '../../../../graphql';

@Resolver()
export class OAuthCreateRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokensHandler,
    ) {}

    @Mutation('oAuthCreateRefreshTokens')
    async main(
        @Args('payload') payload: OAuthCreateRefreshTokenInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}