import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateHttpCommunicationsHandler } from '../handlers/auditing-create-http-communications.handler';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.create')
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