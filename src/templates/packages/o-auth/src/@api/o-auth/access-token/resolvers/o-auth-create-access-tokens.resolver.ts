import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { OAuthCreateAccessTokensHandler } from '../handlers/o-auth-create-access-tokens.handler';
import { OAuthCreateAccessTokenInput } from '../../../../graphql';

@Resolver()
export class OAuthCreateAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthCreateAccessTokensHandler,
    ) {}

    @Mutation('oAuthCreateAccessTokens')
    async main(
        @Args('payload') payload: OAuthCreateAccessTokenInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}