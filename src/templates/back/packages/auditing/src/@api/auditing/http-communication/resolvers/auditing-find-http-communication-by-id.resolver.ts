import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingFindHttpCommunicationByIdHandler } from '../handlers/auditing-find-http-communication-by-id.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingFindHttpCommunicationByIdResolver
{
    constructor(
        private readonly handler: AuditingFindHttpCommunicationByIdHandler,
    ) {}

    @Query('auditingFindHttpCommunicationById')
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