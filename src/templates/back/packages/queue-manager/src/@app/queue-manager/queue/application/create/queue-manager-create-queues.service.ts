import {
    QueueManagerAddQueuesContextEvent,
    QueueManagerIQueueRepository,
    QueueManagerQueue,
} from '@app/queue-manager/queue';
import {
    QueueManagerQueueCreatedAt,
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
    QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerCreateQueuesService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        payload: {
            id: QueueManagerQueueId;
            prefix: QueueManagerQueuePrefix;
            name: QueueManagerQueueName;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const queues = payload.map((queue) =>
            QueueManagerQueue.register(
                queue.id,
                undefined, // rowId
                queue.prefix,
                queue.name,
                new QueueManagerQueueCreatedAt({ currentTimestamp: true }),
                new QueueManagerQueueUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(queues, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddQueuesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const queuesRegistered = this.publisher.mergeObjectContext(
            new QueueManagerAddQueuesContextEvent(queues, cQMetadata),
        );

        queuesRegistered.created(); // apply event to model events
        queuesRegistered.commit(); // commit all events of model
    }
}
