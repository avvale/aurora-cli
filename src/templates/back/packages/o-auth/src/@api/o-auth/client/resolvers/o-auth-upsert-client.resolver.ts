import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';
import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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