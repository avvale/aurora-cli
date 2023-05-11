import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';
import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';

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