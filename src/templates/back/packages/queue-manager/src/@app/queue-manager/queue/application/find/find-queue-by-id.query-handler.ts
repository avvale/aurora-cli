import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueResponse } from '../../domain/queue.response';
import { QueueMapper } from '../../domain/queue.mapper';
import { QueueId } from '../../domain/value-objects';
import { FindQueueByIdQuery } from './find-queue-by-id.query';
import { FindQueueByIdService } from './find-queue-by-id.service';

@QueryHandler(FindQueueByIdQuery)
export class FindQueueByIdQueryHandler implements IQueryHandler<FindQueueByIdQuery>
{
    private readonly mapper: QueueMapper = new QueueMapper();

    constructor(
        private readonly findQueueByIdService: FindQueueByIdService,
    ) {}

    async execute(query: FindQueueByIdQuery): Promise<QueueResponse>
    {
        const queue = await this.findQueueByIdService.main(
            new QueueId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(queue);
    }
}