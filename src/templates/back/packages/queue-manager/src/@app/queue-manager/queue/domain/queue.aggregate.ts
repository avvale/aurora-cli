/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurora-ts/core';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from './value-objects';
import { CreatedQueueEvent } from '../application/events/created-queue.event';
import { UpdatedQueueEvent } from '../application/events/updated-queue.event';
import { DeletedQueueEvent } from '../application/events/deleted-queue.event';

export class QueueManagerQueue extends AggregateRoot
{
    id: QueueId;
    prefix: QueuePrefix;
    name: QueueName;
    createdAt: QueueCreatedAt;
    updatedAt: QueueUpdatedAt;
    deletedAt: QueueDeletedAt;

    // eager relationship

    constructor(
        id: QueueId,
        prefix: QueuePrefix,
        name: QueueName,
        createdAt: QueueCreatedAt,
        updatedAt: QueueUpdatedAt,
        deletedAt: QueueDeletedAt,

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
        id: QueueId,
        prefix: QueuePrefix,
        name: QueueName,
        createdAt: QueueCreatedAt,
        updatedAt: QueueUpdatedAt,
        deletedAt: QueueDeletedAt,

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
            new CreatedQueueEvent(
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
            new UpdatedQueueEvent(
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
            new DeletedQueueEvent(
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
