import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { OAuthCreateAccessTokenHandler } from '../handlers/o-auth-create-access-token.handler';
import { OAuthAccessToken, OAuthCreateAccessTokenInput } from '../../../../graphql';

@Resolver()
export class OAuthCreateAccessTokenResolver
{
    constructor(
        private readonly handler: OAuthCreateAccessTokenHandler,
    ) {}

    @Mutation('oAuthCreateAccessToken')
    async main(
        @Args('payload') payload: OAuthCreateAccessTokenInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}