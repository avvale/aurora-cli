import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingDeleteHttpCommunicationByIdHandler } from '../handlers/auditing-delete-http-communication-by-id.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingDeleteHttpCommunicationByIdResolver
{
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationByIdHandler,
    ) {}

    @Mutation('auditingDeleteHttpCommunicationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}