import {
  QueueManagerAddQueuesContextEvent,
  QueueManagerIQueueRepository,
  QueueManagerQueue,
} from '@app/queue-manager/queue';
import {
  QueueManagerQueueId,
  QueueManagerQueueName,
  QueueManagerQueuePrefix,
  QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerUpdateQueuesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: QueueManagerIQueueRepository,
  ) {}

  async main(
    payload: {
      id?: QueueManagerQueueId;
      prefix?: QueueManagerQueuePrefix;
      name?: QueueManagerQueueName;
    },
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const queue = QueueManagerQueue.register(
      payload.id,
      undefined, // rowId
      payload.prefix,
      payload.name,
      null, // createdAt
      new QueueManagerQueueUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update
    await this.repository.update(queue, {
      queryStatement,
      constraint,
      cQMetadata,
      updateOptions: cQMetadata?.repositoryOptions,
    });

    // get objects to delete
    const queues = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const queuesRegister = this.publisher.mergeObjectContext(
      new QueueManagerAddQueuesContextEvent(queues, cQMetadata),
    );

    queuesRegister.updated(); // apply event to model events
    queuesRegister.commit(); // commit all events of model
  }
}
