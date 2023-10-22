import { AuditingUpdateHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationsInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.update')
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
