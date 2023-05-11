import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingPaginateHttpCommunicationsHandler } from '../handlers/auditing-paginate-http-communications.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('auditing.httpCommunication.get')
export class AuditingPaginateHttpCommunicationsResolver
{
    constructor(
        private readonly handler: AuditingPaginateHttpCommunicationsHandler,
    ) {}

    @Query('auditingPaginateHttpCommunications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}