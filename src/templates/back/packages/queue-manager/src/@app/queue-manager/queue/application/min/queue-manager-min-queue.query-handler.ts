import { QueueManagerMinQueueQuery } from '@app/queue-manager/queue';
import { QueueManagerMinQueueService } from '@app/queue-manager/queue/application/min/queue-manager-min-queue.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerMinQueueQuery)
export class QueueManagerMinQueueQueryHandler implements IQueryHandler<QueueManagerMinQueueQuery>
{
    constructor(
        private readonly minQueueService: QueueManagerMinQueueService,
    ) {}

    async execute(query: QueueManagerMinQueueQuery): Promise<number>
    {
        return await this.minQueueService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
