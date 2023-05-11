import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '../../domain/value-objects';
import { IQueueRepository } from '../../domain/queue.repository';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import { AddQueuesContextEvent } from '../events/add-queues-context.event';

@Injectable()
export class CreateQueuesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        queues: {
            id: QueueId;
            prefix: QueuePrefix;
            name: QueueName;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateQueues = queues.map(queue => QueueManagerQueue.register(
            queue.id,
            queue.prefix,
            queue.name,
            new QueueCreatedAt({ currentTimestamp: true }),
            new QueueUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateQueues, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddQueuesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const queuesRegistered = this.publisher.mergeObjectContext(new AddQueuesContextEvent(aggregateQueues));

        queuesRegistered.created(); // apply event to model events
        queuesRegistered.commit(); // commit all events of model
    }
}