import { AuditingCreateHttpCommunicationHandler } from '@api/auditing/http-communication';
import {
    AuditingCreateHttpCommunicationInput,
    AuditingHttpCommunication,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.create')
export class AuditingCreateHttpCommunicationResolver {
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationHandler,
    ) {}

    @Mutation('auditingCreateHttpCommunication')
    async main(
        @Args('payload') payload: AuditingCreateHttpCommunicationInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication> {
        return await this.handler.main(payload, timezone);
    }
}
