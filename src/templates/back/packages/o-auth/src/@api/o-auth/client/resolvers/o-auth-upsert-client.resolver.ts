import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthUpsertClientHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.upsert')
export class OAuthUpsertClientResolver
{
    constructor(
        private readonly handler: OAuthUpsertClientHandler,
    ) {}

    @Mutation('oAuthUpsertClient')
    async main(
        @Args('payload') payload: OAuthUpdateClientByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
