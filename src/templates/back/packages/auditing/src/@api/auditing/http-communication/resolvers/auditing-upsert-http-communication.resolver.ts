import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { AuditingUpsertHttpCommunicationHandler } from '../handlers/auditing-upsert-http-communication.handler';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpsertHttpCommunicationResolver
{
    constructor(
        private readonly handler: AuditingUpsertHttpCommunicationHandler,
    ) {}

    @Mutation('auditingUpsertHttpCommunication')
    async main(
        @Args('payload') payload: AuditingUpdateHttpCommunicationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}