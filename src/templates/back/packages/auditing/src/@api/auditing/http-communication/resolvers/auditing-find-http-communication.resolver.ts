import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingFindHttpCommunicationHandler } from '../handlers/auditing-find-http-communication.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingFindHttpCommunicationResolver
{
    constructor(
        private readonly handler: AuditingFindHttpCommunicationHandler,
    ) {}

    @Query('auditingFindHttpCommunication')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}