import { QueueManagerSumQueueQuery } from '@app/queue-manager/queue';
import { QueueManagerSumQueueService } from '@app/queue-manager/queue/application/sum/queue-manager-sum-queue.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerSumQueueQuery)
export class QueueManagerSumQueueQueryHandler implements IQueryHandler<QueueManagerSumQueueQuery>
{
    constructor(
        private readonly sumQueueService: QueueManagerSumQueueService,
    ) {}

    async execute(query: QueueManagerSumQueueQuery): Promise<number>
    {
        return await this.sumQueueService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
