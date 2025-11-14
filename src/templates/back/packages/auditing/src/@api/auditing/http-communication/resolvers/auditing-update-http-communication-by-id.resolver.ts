import { AuditingUpdateHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import {
    AuditingHttpCommunication,
    AuditingUpdateHttpCommunicationByIdInput,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.update')
export class AuditingUpdateHttpCommunicationByIdResolver {
    constructor(
        private readonly handler: AuditingUpdateHttpCommunicationByIdHandler,
    ) {}

    @Mutation('auditingUpdateHttpCommunicationById')
    async main(
        @Args('payload') payload: AuditingUpdateHttpCommunicationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication> {
        return await this.handler.main(payload, constraint, timezone);
    }
}
