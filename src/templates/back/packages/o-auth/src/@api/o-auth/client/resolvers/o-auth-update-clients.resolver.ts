import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpdateClientsHandler } from '../handlers/o-auth-update-clients.handler';
import { OAuthClient, OAuthUpdateClientsInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpdateClientsResolver
{
    constructor(
        private readonly handler: OAuthUpdateClientsHandler,
    ) {}

    @Mutation('oAuthUpdateClients')
    async main(
        @Args('payload') payload: OAuthUpdateClientsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}