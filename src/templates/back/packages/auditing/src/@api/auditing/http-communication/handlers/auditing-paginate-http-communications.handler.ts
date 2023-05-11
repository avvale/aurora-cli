import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateHttpCommunicationsQuery } from '@app/auditing/http-communication/application/paginate/paginate-http-communications.query';
import { Pagination } from '@api/graphql';

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
        return await this.queryBus.ask(new PaginateHttpCommunicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}