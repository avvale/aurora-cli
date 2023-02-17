import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingUpdateHttpCommunicationByIdHandler } from '../handlers/auditing-update-http-communication-by-id.handler';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpdateHttpCommunicationByIdResolver
{
    constructor(
        private readonly handler: AuditingUpdateHttpCommunicationByIdHandler,
    ) {}

    @Mutation('auditingUpdateHttpCommunicationById')
    async main(
        @Args('payload') payload: AuditingUpdateHttpCommunicationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}