import {
  QueueManagerCreatedQueueEvent,
  QueueManagerCreatedQueuesEvent,
  QueueManagerDeletedQueueEvent,
  QueueManagerDeletedQueuesEvent,
  QueueManagerQueue,
  QueueManagerUpdatedQueueEvent,
  QueueManagerUpdatedQueuesEvent,
} from '@app/queue-manager/queue';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class QueueManagerAddQueuesContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: QueueManagerQueue[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new QueueManagerCreatedQueuesEvent({
        payload: this.aggregateRoots.map(
          (queue) =>
            new QueueManagerCreatedQueueEvent({
              payload: {
                id: queue.id.value,
                prefix: queue.prefix.value,
                name: queue.name.value,
                createdAt: queue.createdAt?.value,
                updatedAt: queue.updatedAt?.value,
                deletedAt: queue.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new QueueManagerUpdatedQueuesEvent({
        payload: this.aggregateRoots.map(
          (queue) =>
            new QueueManagerUpdatedQueueEvent({
              payload: {
                id: queue.id.value,
                prefix: queue.prefix.value,
                name: queue.name.value,
                createdAt: queue.createdAt?.value,
                updatedAt: queue.updatedAt?.value,
                deletedAt: queue.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new QueueManagerDeletedQueuesEvent({
        payload: this.aggregateRoots.map(
          (queue) =>
            new QueueManagerDeletedQueueEvent({
              payload: {
                id: queue.id.value,
                rowId: queue.rowId.value,
                prefix: queue.prefix.value,
                name: queue.name.value,
                createdAt: queue.createdAt?.value,
                updatedAt: queue.updatedAt?.value,
                deletedAt: queue.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
