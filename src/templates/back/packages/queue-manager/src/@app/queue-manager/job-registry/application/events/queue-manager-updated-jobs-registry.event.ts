import { QueueManagerUpdatedJobRegistryEvent } from '@app/queue-manager/job-registry';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerUpdatedJobsRegistryEvent {
  constructor(
    public readonly event: {
      payload: QueueManagerUpdatedJobRegistryEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
