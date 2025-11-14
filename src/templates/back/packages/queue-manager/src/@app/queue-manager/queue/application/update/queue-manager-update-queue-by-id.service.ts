import {
    QueueManagerIQueueRepository,
    QueueManagerQueue,
} from '@app/queue-manager/queue';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
    QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerUpdateQueueByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        payload: {
            id: QueueManagerQueueId;
            prefix?: QueueManagerQueuePrefix;
            name?: QueueManagerQueueName;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const queue = QueueManagerQueue.register(
            payload.id,
            undefined, // rowId
            payload.prefix,
            payload.name,
            null, // createdAt
            new QueueManagerQueueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(queue, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const queueRegister = this.publisher.mergeObjectContext(queue);

        queueRegister.updated({
            payload: queue,
            cQMetadata,
        }); // apply event to model events
        queueRegister.commit(); // commit all events of model
    }
}
