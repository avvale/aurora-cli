import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingUpdateHttpCommunicationsHandler } from '../handlers/auditing-update-http-communications.handler';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationsInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpdateHttpCommunicationsResolver
{
    constructor(
        private readonly handler: AuditingUpdateHttpCommunicationsHandler,
    ) {}

    @Mutation('auditingUpdateHttpCommunications')
    async main(
        @Args('payload') payload: AuditingUpdateHttpCommunicationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}