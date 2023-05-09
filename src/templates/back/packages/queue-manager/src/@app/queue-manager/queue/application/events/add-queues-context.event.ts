import { AggregateRoot } from '@nestjs/cqrs';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import { CreatedQueueEvent } from './created-queue.event';
import { CreatedQueuesEvent } from './created-queues.event';
import { UpdatedQueueEvent } from './updated-queue.event';
import { UpdatedQueuesEvent } from './updated-queues.event';
import { DeletedQueueEvent } from './deleted-queue.event';
import { DeletedQueuesEvent } from './deleted-queues.event';

export class AddQueuesContextEvent extends AggregateRoot
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
            new CreatedQueuesEvent(
                this.aggregateRoots.map(queue =>
                    new CreatedQueueEvent(
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
            new UpdatedQueuesEvent(
                this.aggregateRoots.map(queue =>
                    new UpdatedQueueEvent(
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
            new DeletedQueuesEvent(
                this.aggregateRoots.map(queue =>
                    new DeletedQueueEvent(
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