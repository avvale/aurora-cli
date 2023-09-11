import { OAuthCreateApplicationClientInput } from '@api/graphql';
import { OAuthCreateApplicationsClientsHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.create')
export class OAuthCreateApplicationsClientsResolver
{
    constructor(
        private readonly handler: OAuthCreateApplicationsClientsHandler,
    ) {}

    @Mutation('oAuthCreateApplicationsClients')
    async main(
        @Args('payload') payload: OAuthCreateApplicationClientInput[],
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
