import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerDeletedJobRegistryEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        queueName: string;
        state: string;
        jobId: string;
        jobName: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
