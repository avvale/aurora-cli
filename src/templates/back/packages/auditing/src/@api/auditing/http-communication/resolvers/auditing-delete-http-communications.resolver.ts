import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteHttpCommunicationsHandler } from '../handlers/auditing-delete-http-communications.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.delete')
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