import {
    QueueManagerGetQueuesQuery,
    QueueManagerQueue,
    QueueManagerQueueMapper,
    QueueManagerQueueResponse,
} from '@app/queue-manager/queue';
import { QueueManagerGetQueuesService } from '@app/queue-manager/queue/application/get/queue-manager-get-queues.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerGetQueuesQuery)
export class QueueManagerGetQueuesQueryHandler
    implements IQueryHandler<QueueManagerGetQueuesQuery>
{
    private readonly mapper: QueueManagerQueueMapper =
        new QueueManagerQueueMapper();

    constructor(
        private readonly getQueuesService: QueueManagerGetQueuesService,
    ) {}

    async execute(
        query: QueueManagerGetQueuesQuery,
    ): Promise<QueueManagerQueueResponse[] | LiteralObject[]> {
        const models = await this.getQueuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as QueueManagerQueue[],
        );
    }
}
