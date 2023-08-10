import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerQueue } from '../../domain/queue-manager-queue.aggregate';
import { QueueManagerAddQueuesContextEvent } from '../events/queue-manager-add-queues-context.event';

@Injectable()
export class QueueManagerUpdateQueuesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        payload: {
            id?: QueueManagerQueueId;
            prefix?: QueueManagerQueuePrefix;
            name?: QueueManagerQueueName;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const queue = QueueManagerQueue.register(
            payload.id,
            payload.prefix,
            payload.name,
            null, // createdAt
            new QueueManagerQueueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            queue,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const queues = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const queuesRegister = this.publisher.mergeObjectContext(
            new QueueManagerAddQueuesContextEvent(queues),
        );

        queuesRegister.updated(); // apply event to model events
        queuesRegister.commit(); // commit all events of model
    }
}
