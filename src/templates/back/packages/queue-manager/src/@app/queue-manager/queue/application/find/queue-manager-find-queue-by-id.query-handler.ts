import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerQueueResponse } from '../../domain/queue-manager-queue.response';
import { QueueManagerQueueMapper } from '../../domain/queue-manager-queue.mapper';
import { QueueManagerQueueId } from '../../domain/value-objects';
import { QueueManagerFindQueueByIdQuery } from './queue-manager-find-queue-by-id.query';
import { QueueManagerFindQueueByIdService } from './queue-manager-find-queue-by-id.service';

@QueryHandler(QueueManagerFindQueueByIdQuery)
export class QueueManagerFindQueueByIdQueryHandler implements IQueryHandler<QueueManagerFindQueueByIdQuery>
{
    private readonly mapper: QueueManagerQueueMapper = new QueueManagerQueueMapper();

    constructor(
        private readonly findQueueByIdService: QueueManagerFindQueueByIdService,
    ) {}

    async execute(query: QueueManagerFindQueueByIdQuery): Promise<QueueManagerQueueResponse>
    {
        const queue = await this.findQueueByIdService.main(
            new QueueManagerQueueId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(queue);
    }
}
