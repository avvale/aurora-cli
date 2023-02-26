import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingFindHttpCommunicationHandler } from '../handlers/auditing-find-http-communication.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.get')
export class AuditingFindHttpCommunicationResolver
{
    constructor(
        private readonly handler: AuditingFindHttpCommunicationHandler,
    ) {}

    @Query('auditingFindHttpCommunication')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}