import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteClientByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientByIdHandler,
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}