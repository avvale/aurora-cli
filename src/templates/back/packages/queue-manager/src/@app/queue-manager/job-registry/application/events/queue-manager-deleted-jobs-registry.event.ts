import { QueueManagerDeletedJobRegistryEvent } from '@app/queue-manager/job-registry';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerDeletedJobsRegistryEvent {
  constructor(
    public readonly event: {
      payload: QueueManagerDeletedJobRegistryEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
