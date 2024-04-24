import { QueueManagerCountQueueQuery } from '@app/queue-manager/queue';
import { QueueManagerCountQueueService } from '@app/queue-manager/queue/application/count/queue-manager-count-queue.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerCountQueueQuery)
export class QueueManagerCountQueueQueryHandler implements IQueryHandler<QueueManagerCountQueueQuery>
{
    constructor(
        private readonly countQueueService: QueueManagerCountQueueService,
    ) {}

    async execute(query: QueueManagerCountQueueQuery): Promise<number>
    {
        return await this.countQueueService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
