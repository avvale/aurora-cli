import { AggregateRoot } from '@nestjs/cqrs';
import { QueueManagerQueue } from '../../domain/queue-manager-queue.aggregate';
import { QueueManagerCreatedQueueEvent } from './queue-manager-created-queue.event';
import { QueueManagerCreatedQueuesEvent } from './queue-manager-created-queues.event';
import { QueueManagerUpdatedQueueEvent } from './queue-manager-updated-queue.event';
import { QueueManagerUpdatedQueuesEvent } from './queue-manager-updated-queues.event';
import { QueueManagerDeletedQueueEvent } from './queue-manager-deleted-queue.event';
import { QueueManagerDeletedQueuesEvent } from './queue-manager-deleted-queues.event';

export class QueueManagerAddQueuesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: QueueManagerQueue[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new QueueManagerCreatedQueuesEvent(
                this.aggregateRoots.map(queue =>
                    new QueueManagerCreatedQueueEvent(
                        queue.id.value,
                        queue.prefix.value,
                        queue.name.value,
                        queue.createdAt?.value,
                        queue.updatedAt?.value,
                        queue.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new QueueManagerUpdatedQueuesEvent(
                this.aggregateRoots.map(queue =>
                    new QueueManagerUpdatedQueueEvent(
                        queue.id.value,
                        queue.prefix.value,
                        queue.name.value,
                        queue.createdAt?.value,
                        queue.updatedAt?.value,
                        queue.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new QueueManagerDeletedQueuesEvent(
                this.aggregateRoots.map(queue =>
                    new QueueManagerDeletedQueueEvent(
                        queue.id.value,
                        queue.prefix.value,
                        queue.name.value,
                        queue.createdAt?.value,
                        queue.updatedAt?.value,
                        queue.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
