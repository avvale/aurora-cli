import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingDeleteHttpCommunicationsHandler } from '../handlers/auditing-delete-http-communications.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingDeleteHttpCommunicationsResolver
{
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationsHandler,
    ) {}

    @Mutation('auditingDeleteHttpCommunications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}