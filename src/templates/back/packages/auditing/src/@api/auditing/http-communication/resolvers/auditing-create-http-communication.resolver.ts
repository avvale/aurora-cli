import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateHttpCommunicationHandler } from '../handlers/auditing-create-http-communication.handler';
import { AuditingHttpCommunication, AuditingCreateHttpCommunicationInput } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.create')
export class AuditingCreateHttpCommunicationResolver
{
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationHandler,
    ) {}

    @Mutation('auditingCreateHttpCommunication')
    async main(
        @Args('payload') payload: AuditingCreateHttpCommunicationInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}