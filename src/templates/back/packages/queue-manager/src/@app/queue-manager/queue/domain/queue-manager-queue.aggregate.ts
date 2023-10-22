/* eslint-disable key-spacing */
import { QueueManagerCreatedQueueEvent, QueueManagerDeletedQueueEvent, QueueManagerUpdatedQueueEvent } from '@app/queue-manager/queue';
import {
    QueueManagerQueueCreatedAt,
    QueueManagerQueueDeletedAt,
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
    QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class QueueManagerQueue extends AggregateRoot
{
    id: QueueManagerQueueId;
    prefix: QueueManagerQueuePrefix;
    name: QueueManagerQueueName;
    createdAt: QueueManagerQueueCreatedAt;
    updatedAt: QueueManagerQueueUpdatedAt;
    deletedAt: QueueManagerQueueDeletedAt;

    constructor(
        id: QueueManagerQueueId,
        prefix: QueueManagerQueuePrefix,
        name: QueueManagerQueueName,
        createdAt: QueueManagerQueueCreatedAt,
        updatedAt: QueueManagerQueueUpdatedAt,
        deletedAt: QueueManagerQueueDeletedAt,
    )
    {
        super();
        this.id = id;
        this.prefix = prefix;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: QueueManagerQueueId,
        prefix: QueueManagerQueuePrefix,
        name: QueueManagerQueueName,
        createdAt: QueueManagerQueueCreatedAt,
        updatedAt: QueueManagerQueueUpdatedAt,
        deletedAt: QueueManagerQueueDeletedAt,
    ): QueueManagerQueue
    {
        return new QueueManagerQueue(
            id,
            prefix,
            name,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(queue: QueueManagerQueue): void
    {
        this.apply(
            new QueueManagerCreatedQueueEvent(
                queue.id.value,
                queue.prefix.value,
                queue.name.value,
                queue.createdAt?.value,
                queue.updatedAt?.value,
                queue.deletedAt?.value,
            ),
        );
    }

    updated(queue: QueueManagerQueue): void
    {
        this.apply(
            new QueueManagerUpdatedQueueEvent(
                queue.id?.value,
                queue.prefix?.value,
                queue.name?.value,
                queue.createdAt?.value,
                queue.updatedAt?.value,
                queue.deletedAt?.value,
            ),
        );
    }

    deleted(queue: QueueManagerQueue): void
    {
        this.apply(
            new QueueManagerDeletedQueueEvent(
                queue.id.value,
                queue.prefix.value,
                queue.name.value,
                queue.createdAt?.value,
                queue.updatedAt?.value,
                queue.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            prefix: this.prefix.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            prefix: this.prefix.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
