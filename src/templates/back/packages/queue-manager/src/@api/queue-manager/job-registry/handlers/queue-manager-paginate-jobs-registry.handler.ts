import { Pagination } from '@api/graphql';
import { QueueManagerPaginateJobsRegistryQuery } from '@app/queue-manager/job-registry';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerPaginateJobsRegistryHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new QueueManagerPaginateJobsRegistryQuery(
                queryStatement,
                constraint,
                {
                    timezone,
                },
            ),
        );
    }
}
