import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { AuditingCreateHttpCommunicationsHandler } from '../handlers/auditing-create-http-communications.handler';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.httpCommunication.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateHttpCommunicationsResolver
{
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationsHandler,
    ) {}

    @Mutation('auditingCreateHttpCommunications')
    async main(
        @Args('payload') payload: AuditingCreateHttpCommunicationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}