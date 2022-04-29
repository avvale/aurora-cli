import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { OAuthCreateRefreshTokenHandler } from '../handlers/o-auth-create-refresh-token.handler';
import { OAuthRefreshToken, OAuthCreateRefreshTokenInput } from '../../../../graphql';

@Resolver()
export class OAuthCreateRefreshTokenResolver
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokenHandler,
    ) {}

    @Mutation('oAuthCreateRefreshToken')
    async main(
        @Args('payload') payload: OAuthCreateRefreshTokenInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}