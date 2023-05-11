import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateHttpCommunicationByIdHandler } from '../handlers/auditing-update-http-communication-by-id.handler';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.update')
export class AuditingUpdateHttpCommunicationByIdResolver
{
    constructor(
        private readonly handler: AuditingUpdateHttpCommunicationByIdHandler,
    ) {}

    @Mutation('auditingUpdateHttpCommunicationById')
    async main(
        @Args('payload') payload: AuditingUpdateHttpCommunicationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}