import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueResponse } from '../../domain/queue.response';
import { QueueMapper } from '../../domain/queue.mapper';
import { FindQueueQuery } from './find-queue.query';
import { FindQueueService } from './find-queue.service';

@QueryHandler(FindQueueQuery)
export class FindQueueQueryHandler implements IQueryHandler<FindQueueQuery>
{
    private readonly mapper: QueueMapper = new QueueMapper();

    constructor(
        private readonly findQueueService: FindQueueService,
    ) {}

    async execute(query: FindQueueQuery): Promise<QueueResponse>
    {
        const queue = await this.findQueueService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(queue);
    }
}