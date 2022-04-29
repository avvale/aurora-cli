import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthUpdateClientHandler } from '../handlers/o-auth-update-client.handler';
import { OAuthClient, OAuthUpdateClientInput } from '../../../../graphql';

@Resolver()
export class OAuthUpdateClientResolver
{
    constructor(
        private readonly handler: OAuthUpdateClientHandler,
    ) {}

    @Mutation('oAuthUpdateClient')
    async main(
        @Args('payload') payload: OAuthUpdateClientInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}