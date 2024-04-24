import { QueueManagerMaxQueueQuery } from '@app/queue-manager/queue';
import { QueueManagerMaxQueueService } from '@app/queue-manager/queue/application/max/queue-manager-max-queue.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerMaxQueueQuery)
export class QueueManagerMaxQueueQueryHandler implements IQueryHandler<QueueManagerMaxQueueQuery>
{
    constructor(
        private readonly maxQueueService: QueueManagerMaxQueueService,
    ) {}

    async execute(query: QueueManagerMaxQueueQuery): Promise<number>
    {
        return await this.maxQueueService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
