import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class QueueManagerUpdateQueueByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      prefix?: string;
      name?: string;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
