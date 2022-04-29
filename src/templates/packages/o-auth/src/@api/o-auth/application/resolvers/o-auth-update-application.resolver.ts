import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthUpdateApplicationHandler } from '../handlers/o-auth-update-application.handler';
import { OAuthApplication, OAuthUpdateApplicationInput } from '../../../../graphql';

@Resolver()
export class OAuthUpdateApplicationResolver
{
    constructor(
        private readonly handler: OAuthUpdateApplicationHandler,
    ) {}

    @Mutation('oAuthUpdateApplication')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}