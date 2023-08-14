/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from './value-objects';
import { QueueManagerCreatedQueueEvent } from '../application/events/queue-manager-created-queue.event';
import { QueueManagerUpdatedQueueEvent } from '../application/events/queue-manager-updated-queue.event';
import { QueueManagerDeletedQueueEvent } from '../application/events/queue-manager-deleted-queue.event';

export class QueueManagerQueue extends AggregateRoot
{
    id: QueueManagerQueueId;
    prefix: QueueManagerQueuePrefix;
    name: QueueManagerQueueName;
    createdAt: QueueManagerQueueCreatedAt;
    updatedAt: QueueManagerQueueUpdatedAt;
    deletedAt: QueueManagerQueueDeletedAt;

    // eager relationship

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

        // eager relationship
    }

    static register (
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

            // eager relationship
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

            // eager relationship
        };
    }
}
