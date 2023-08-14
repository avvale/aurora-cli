import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerQueueResponse } from '../../domain/queue-manager-queue.response';
import { QueueManagerQueueMapper } from '../../domain/queue-manager-queue.mapper';
import { QueueManagerGetQueuesQuery } from './queue-manager-get-queues.query';
import { QueueManagerGetQueuesService } from './queue-manager-get-queues.service';

@QueryHandler(QueueManagerGetQueuesQuery)
export class QueueManagerGetQueuesQueryHandler implements IQueryHandler<QueueManagerGetQueuesQuery>
{
    private readonly mapper: QueueManagerQueueMapper = new QueueManagerQueueMapper();

    constructor(
        private readonly getQueuesService: QueueManagerGetQueuesService,
    ) {}

    async execute(query: QueueManagerGetQueuesQuery): Promise<QueueManagerQueueResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getQueuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
