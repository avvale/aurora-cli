import { Pagination } from '@api/graphql';
import { AuditingPaginateHttpCommunicationsQuery } from '@app/auditing/http-communication';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingPaginateHttpCommunicationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new AuditingPaginateHttpCommunicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
