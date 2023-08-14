import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { QueueManagerPaginateQueuesQuery } from './queue-manager-paginate-queues.query';
import { QueueManagerPaginateQueuesService } from './queue-manager-paginate-queues.service';

@QueryHandler(QueueManagerPaginateQueuesQuery)
export class QueueManagerPaginateQueuesQueryHandler implements IQueryHandler<QueueManagerPaginateQueuesQuery>
{
    constructor(
        private readonly paginateQueuesService: QueueManagerPaginateQueuesService,
    ) {}

    async execute(query: QueueManagerPaginateQueuesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateQueuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
