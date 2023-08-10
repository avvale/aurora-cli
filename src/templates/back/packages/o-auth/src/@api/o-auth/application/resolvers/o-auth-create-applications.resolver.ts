import { OAuthCreateApplicationInput } from '@api/graphql';
import { OAuthCreateApplicationsHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.create')
export class OAuthCreateApplicationsResolver
{
    constructor(
        private readonly handler: OAuthCreateApplicationsHandler,
    ) {}

    @Mutation('oAuthCreateApplications')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
