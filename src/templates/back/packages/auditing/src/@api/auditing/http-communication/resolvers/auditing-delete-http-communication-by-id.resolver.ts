import { AuditingDeleteHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.delete')
export class AuditingDeleteHttpCommunicationByIdResolver {
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationByIdHandler,
    ) {}

    @Mutation('auditingDeleteHttpCommunicationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication> {
        return await this.handler.main(id, constraint, timezone);
    }
}
