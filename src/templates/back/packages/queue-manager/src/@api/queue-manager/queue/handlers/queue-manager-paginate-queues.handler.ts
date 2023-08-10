import { Pagination } from '@api/graphql';
import { QueueRedisImplementationService } from '@api/queue-manager/shared/services';
import { QueueManagerPaginateQueuesQuery } from '@app/queue-manager/queue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerPaginateQueuesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly queueRedisImplementationService: QueueRedisImplementationService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        const paginateQueuesQuery = await this.queryBus.ask(new QueueManagerPaginateQueuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        paginateQueuesQuery.rows = paginateQueuesQuery
            .rows
            .map(async queue => await this.queueRedisImplementationService.addQueueCounters(queue));

        return paginateQueuesQuery;
    }
}
