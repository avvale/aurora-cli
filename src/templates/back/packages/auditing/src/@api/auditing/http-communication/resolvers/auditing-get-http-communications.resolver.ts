import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingGetHttpCommunicationsHandler } from '../handlers/auditing-get-http-communications.handler';
import { AuditingHttpCommunication } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.get')
export class AuditingGetHttpCommunicationsResolver
{
    constructor(
        private readonly handler: AuditingGetHttpCommunicationsHandler,
    ) {}

    @Query('auditingGetHttpCommunications')
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