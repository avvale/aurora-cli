import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateJobsRegistryQuery } from '@app/queue-manager/job-registry/application/paginate/paginate-jobs-registry.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class QueueManagerPaginateJobsRegistryHandler
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
        return await this.queryBus.ask(new PaginateJobsRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}