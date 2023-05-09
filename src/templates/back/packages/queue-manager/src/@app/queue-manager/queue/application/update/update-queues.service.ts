import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
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
export class UpdateQueuesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        payload: {
            id?: QueueId;
            prefix?: QueuePrefix;
            name?: QueueName;
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
            new QueueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(queue, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const queues = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const queuesRegister = this.publisher.mergeObjectContext(
            new AddQueuesContextEvent(queues),
        );

        queuesRegister.updated(); // apply event to model events
        queuesRegister.commit(); // commit all events of model
    }
}