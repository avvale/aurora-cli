import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { QueueRedisImplementationService } from '@api/queue-manager/shared/services/queue-redis-implementation.service';
import { PaginateQueuesQuery } from '@app/queue-manager/queue/application/paginate/paginate-queues.query';
import { Pagination } from '@api/graphql';

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
        const paginateQueuesQuery = await this.queryBus.ask(new PaginateQueuesQuery(
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