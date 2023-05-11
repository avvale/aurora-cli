import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { QueueManagerQueue } from './queue.aggregate';
import { QueueResponse } from './queue.response';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from './value-objects';

export class QueueMapper implements IMapper
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
    mapAggregateToResponse(queue: QueueManagerQueue): QueueResponse
    {
        return this.makeResponse(queue);
    }

    /**
     * Map array of aggregates to array responses
     * @param queues
     */
    mapAggregatesToResponses(queues: QueueManagerQueue[]): QueueResponse[]
    {
        if (!Array.isArray(queues)) return;

        return queues.map(queue => this.makeResponse(queue));
    }

    private makeAggregate(queue: LiteralObject, cQMetadata?: CQMetadata): QueueManagerQueue
    {
        return QueueManagerQueue.register(
            new QueueId(queue.id, { undefinable: true }),
            new QueuePrefix(queue.prefix, { undefinable: true }),
            new QueueName(queue.name, { undefinable: true }),
            new QueueCreatedAt(queue.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new QueueUpdatedAt(queue.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new QueueDeletedAt(queue.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(queue: QueueManagerQueue): QueueResponse
    {
        if (!queue) return;

        return new QueueResponse(
            queue.id.value,
            queue.prefix.value,
            queue.name.value,
            queue.createdAt.value,
            queue.updatedAt.value,
            queue.deletedAt.value,
        );
    }
}