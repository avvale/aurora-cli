import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { AuditingCreateHttpCommunicationHandler } from '../handlers/auditing-create-http-communication.handler';
import { AuditingHttpCommunication, AuditingCreateHttpCommunicationInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateHttpCommunicationResolver
{
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationHandler,
    ) {}

    @Mutation('auditingCreateHttpCommunication')
    async main(
        @Args('payload') payload: AuditingCreateHttpCommunicationInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}