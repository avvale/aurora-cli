import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import { IQueueRepository } from '../../domain/queue.repository';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import {
	QueueCreatedAt,
	QueueDeletedAt,
	QueueId,
	QueueName,
	QueuePrefix,
	QueueUpdatedAt,
} from '../../domain/value-objects';

@Injectable()
export class CreateQueueService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        payload: {
            id: QueueId;
            prefix: QueuePrefix;
            name: QueueName;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const queue = QueueManagerQueue.register(
            payload.id,
            payload.prefix,
            payload.name,
            new QueueCreatedAt({ currentTimestamp: true }),
            new QueueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(queue, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const queueRegister = this.publisher.mergeObjectContext(
            queue,
        );

        queueRegister.created(queue); // apply event to model events
        queueRegister.commit(); // commit all events of model
    }
}