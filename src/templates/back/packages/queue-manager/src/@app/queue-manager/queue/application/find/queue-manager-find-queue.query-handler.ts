import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerQueueResponse } from '../../domain/queue-manager-queue.response';
import { QueueManagerQueueMapper } from '../../domain/queue-manager-queue.mapper';
import { QueueManagerFindQueueQuery } from './queue-manager-find-queue.query';
import { QueueManagerFindQueueService } from './queue-manager-find-queue.service';

@QueryHandler(QueueManagerFindQueueQuery)
export class QueueManagerFindQueueQueryHandler implements IQueryHandler<QueueManagerFindQueueQuery>
{
    private readonly mapper: QueueManagerQueueMapper = new QueueManagerQueueMapper();

    constructor(
        private readonly findQueueService: QueueManagerFindQueueService,
    ) {}

    async execute(query: QueueManagerFindQueueQuery): Promise<QueueManagerQueueResponse>
    {
        const queue = await this.findQueueService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(queue);
    }
}
