import {
    QueueManagerFindQueueQuery,
    QueueManagerQueueMapper,
    QueueManagerQueueResponse,
} from '@app/queue-manager/queue';
import { QueueManagerFindQueueService } from '@app/queue-manager/queue/application/find/queue-manager-find-queue.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerFindQueueQuery)
export class QueueManagerFindQueueQueryHandler
    implements IQueryHandler<QueueManagerFindQueueQuery>
{
    private readonly mapper: QueueManagerQueueMapper =
        new QueueManagerQueueMapper();

    constructor(
        private readonly findQueueService: QueueManagerFindQueueService,
    ) {}

    async execute(
        query: QueueManagerFindQueueQuery,
    ): Promise<QueueManagerQueueResponse> {
        const queue = await this.findQueueService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(queue);
    }
}
