import {
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class QueueManagerMockQueueSeeder extends MockSeeder<QueueManagerQueue> {
  public collectionSource: QueueManagerQueue[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const queue of _.orderBy(queueManagerMockQueueData, ['id'])) {
      this.collectionSource.push(
        QueueManagerQueue.register(
          new QueueManagerQueueId(queue.id),
          new QueueManagerQueueRowId(queue.rowId),
          new QueueManagerQueuePrefix(queue.prefix),
          new QueueManagerQueueName(queue.name),
          new QueueManagerQueueCreatedAt({ currentTimestamp: true }),
          new QueueManagerQueueUpdatedAt({ currentTimestamp: true }),
          new QueueManagerQueueDeletedAt(null),
        ),
      );
    }
  }
}
