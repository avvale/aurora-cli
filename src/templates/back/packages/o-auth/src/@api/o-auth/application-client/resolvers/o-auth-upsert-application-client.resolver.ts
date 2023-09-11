import { OAuthApplicationClient, OAuthUpdateApplicationClientByIdInput } from '@api/graphql';
import { OAuthUpsertApplicationClientHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.upsert')
export class OAuthUpsertApplicationClientResolver
{
    constructor(
        private readonly handler: OAuthUpsertApplicationClientHandler,
    ) {}

    @Mutation('oAuthUpsertApplicationClient')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationClientByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
