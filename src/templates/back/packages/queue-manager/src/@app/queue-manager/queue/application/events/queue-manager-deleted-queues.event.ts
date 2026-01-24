import { QueueManagerDeletedQueueEvent } from '@app/queue-manager/queue';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerDeletedQueuesEvent {
  constructor(
    public readonly event: {
      payload: QueueManagerDeletedQueueEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
