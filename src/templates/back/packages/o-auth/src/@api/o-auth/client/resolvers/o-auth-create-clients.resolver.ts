import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';
import { OAuthCreateClientInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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