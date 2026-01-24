import { QueueManagerUpdatedQueueEvent } from '@app/queue-manager/queue';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerUpdatedQueuesEvent {
  constructor(
    public readonly event: {
      payload: QueueManagerUpdatedQueueEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
