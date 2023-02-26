import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';
import { OAuthCreateClientInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.create')
export class OAuthCreateClientsResolver
{
    constructor(
        private readonly handler: OAuthCreateClientsHandler,
    ) {}

    @Mutation('oAuthCreateClients')
    async main(
        @Args('payload') payload: OAuthCreateClientInput[],
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