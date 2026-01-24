import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerCreateQueuesCommand {
  constructor(
    public readonly payload: {
      id: string;
      prefix: string;
      name: string;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
