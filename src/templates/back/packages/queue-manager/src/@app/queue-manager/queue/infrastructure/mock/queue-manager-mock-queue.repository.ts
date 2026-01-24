import {
  QueueManagerIQueueRepository,
  queueManagerMockQueueData,
  QueueManagerQueue,
} from '@app/queue-manager/queue';
import {
  QueueManagerQueueCreatedAt,
  QueueManagerQueueDeletedAt,
  QueueManagerQueueId,
  QueueManagerQueueName,
  QueueManagerQueuePrefix,
  QueueManagerQueueRowId,
  QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerMockQueueRepository
  extends MockRepository<QueueManagerQueue>
  implements QueueManagerIQueueRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'QueueManagerQueue';
  public collectionSource: QueueManagerQueue[];

  constructor() {
    super();
    this.createSourceMockData();
  }

  public reset(): void {
    this.createSourceMockData();
  }

  private createSourceMockData(): void {
    this.collectionSource = [];
    const now = Utils.nowTimestamp();

    for (const itemCollection of <any[]>queueManagerMockQueueData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        QueueManagerQueue.register(
          new QueueManagerQueueId(itemCollection.id),
          new QueueManagerQueueRowId(itemCollection.rowId),
          new QueueManagerQueuePrefix(itemCollection.prefix),
          new QueueManagerQueueName(itemCollection.name),
          new QueueManagerQueueCreatedAt(itemCollection.createdAt),
          new QueueManagerQueueUpdatedAt(itemCollection.updatedAt),
          new QueueManagerQueueDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
