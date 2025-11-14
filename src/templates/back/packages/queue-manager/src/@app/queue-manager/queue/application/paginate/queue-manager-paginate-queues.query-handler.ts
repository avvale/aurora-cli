import { QueueManagerPaginateQueuesQuery } from '@app/queue-manager/queue';
import { QueueManagerPaginateQueuesService } from '@app/queue-manager/queue/application/paginate/queue-manager-paginate-queues.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerPaginateQueuesQuery)
export class QueueManagerPaginateQueuesQueryHandler
    implements IQueryHandler<QueueManagerPaginateQueuesQuery>
{
    constructor(
        private readonly paginateQueuesService: QueueManagerPaginateQueuesService,
    ) {}

    async execute(
        query: QueueManagerPaginateQueuesQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateQueuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map((item) => item.toDTO()),
        );
    }
}
