import { QueueManagerCreatedQueueEvent, QueueManagerCreatedQueuesEvent, QueueManagerDeletedQueueEvent, QueueManagerDeletedQueuesEvent, QueueManagerQueue, QueueManagerUpdatedQueueEvent, QueueManagerUpdatedQueuesEvent } from '@app/queue-manager/queue';
import { AggregateRoot } from '@nestjs/cqrs';

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
