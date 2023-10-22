import { AuditingUpsertHttpCommunicationHandler } from '@api/auditing/http-communication';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.upsert')
export class AuditingUpsertHttpCommunicationResolver
{
    constructor(
        private readonly handler: AuditingUpsertHttpCommunicationHandler,
    ) {}

    @Mutation('auditingUpsertHttpCommunication')
    async main(
        @Args('payload') payload: AuditingUpdateHttpCommunicationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
