import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';
import { OAuthCreateScopeInput } from '../../../../graphql';

@Resolver()
export class OAuthCreateScopesResolver
{
    constructor(
        private readonly handler: OAuthCreateScopesHandler,
    ) {}

    @Mutation('oAuthCreateScopes')
    async main(
        @Args('payload') payload: OAuthCreateScopeInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}