import {
  QueueManagerIQueueRepository,
  QueueManagerQueue,
} from '@app/queue-manager/queue';
import {
  QueueManagerQueueCreatedAt,
  QueueManagerQueueId,
  QueueManagerQueueName,
  QueueManagerQueuePrefix,
  QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerCreateQueueService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: QueueManagerIQueueRepository,
  ) {}

  async main(
    payload: {
      id: QueueManagerQueueId;
      prefix: QueueManagerQueuePrefix;
      name: QueueManagerQueueName;
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const queue = QueueManagerQueue.register(
      payload.id,
      undefined, // rowId
      payload.prefix,
      payload.name,
      new QueueManagerQueueCreatedAt({ currentTimestamp: true }),
      new QueueManagerQueueUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(queue, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const queueRegister = this.publisher.mergeObjectContext(queue);

    queueRegister.created({
      payload: queue,
      cQMetadata,
    }); // apply event to model events
    queueRegister.commit(); // commit all events of model
  }
}
