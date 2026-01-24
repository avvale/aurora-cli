import { QueueManagerCreatedJobRegistryEvent } from '@app/queue-manager/job-registry';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerCreatedJobsRegistryEvent {
  constructor(
    public readonly event: {
      payload: QueueManagerCreatedJobRegistryEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
