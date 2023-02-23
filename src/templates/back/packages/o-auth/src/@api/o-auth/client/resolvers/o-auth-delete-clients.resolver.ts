import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthDeleteClientsHandler } from '../handlers/o-auth-delete-clients.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteClientsResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientsHandler,
    ) {}

    @Mutation('oAuthDeleteClients')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}