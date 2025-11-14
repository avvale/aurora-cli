import { AuditingDeleteHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.delete')
export class AuditingDeleteHttpCommunicationsResolver {
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationsHandler,
    ) {}

    @Mutation('auditingDeleteHttpCommunications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
