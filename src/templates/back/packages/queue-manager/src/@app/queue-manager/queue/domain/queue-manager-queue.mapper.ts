import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { QueueManagerQueue } from './queue-manager-queue.aggregate';
import { QueueManagerQueueResponse } from './queue-manager-queue.response';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from './value-objects';

export class QueueManagerQueueMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param queue
     */
    mapModelToAggregate(queue: LiteralObject, cQMetadata?: CQMetadata): QueueManagerQueue
    {
        if (!queue) return;

        return this.makeAggregate(queue, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param queues
     */
    mapModelsToAggregates(queues: LiteralObject[], cQMetadata?: CQMetadata): QueueManagerQueue[]
    {
        if (!Array.isArray(queues)) return;

        return queues.map(queue => this.makeAggregate(queue, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param queue
     */
    mapAggregateToResponse(queue: QueueManagerQueue): QueueManagerQueueResponse
    {
        return this.makeResponse(queue);
    }

    /**
     * Map array of aggregates to array responses
     * @param queues
     */
    mapAggregatesToResponses(queues: QueueManagerQueue[]): QueueManagerQueueResponse[]
    {
        if (!Array.isArray(queues)) return;

        return queues.map(queue => this.makeResponse(queue));
    }

    private makeAggregate(queue: LiteralObject, cQMetadata?: CQMetadata): QueueManagerQueue
    {
        return QueueManagerQueue.register(
            new QueueManagerQueueId(queue.id, { undefinable: true }),
            new QueueManagerQueuePrefix(queue.prefix, { undefinable: true }),
            new QueueManagerQueueName(queue.name, { undefinable: true }),
            new QueueManagerQueueCreatedAt(queue.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new QueueManagerQueueUpdatedAt(queue.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new QueueManagerQueueDeletedAt(queue.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(queue: QueueManagerQueue): QueueManagerQueueResponse
    {
        if (!queue) return;

        return new QueueManagerQueueResponse(
            queue.id.value,
            queue.prefix.value,
            queue.name.value,
            queue.createdAt.value,
            queue.updatedAt.value,
            queue.deletedAt.value,
        );
    }
}
