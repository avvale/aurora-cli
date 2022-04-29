import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';
import { OAuthCreateApplicationInput } from '../../../../graphql';

@Resolver()
export class OAuthCreateApplicationsResolver
{
    constructor(
        private readonly handler: OAuthCreateApplicationsHandler,
    ) {}

    @Mutation('oAuthCreateApplications')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}