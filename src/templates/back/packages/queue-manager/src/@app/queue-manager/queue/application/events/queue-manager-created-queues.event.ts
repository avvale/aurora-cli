import { QueueManagerCreatedQueueEvent } from '@app/queue-manager/queue';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerCreatedQueuesEvent {
  constructor(
    public readonly event: {
      payload: QueueManagerCreatedQueueEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
