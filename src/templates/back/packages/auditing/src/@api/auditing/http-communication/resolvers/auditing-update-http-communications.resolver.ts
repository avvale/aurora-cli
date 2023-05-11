import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateHttpCommunicationsHandler } from '../handlers/auditing-update-http-communications.handler';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationsInput } from '@api/graphql';

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