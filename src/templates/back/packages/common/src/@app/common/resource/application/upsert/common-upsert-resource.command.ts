import { CQMetadata } from '@aurorajs.dev/core';

export class CommonUpsertResourceCommand {
  constructor(
    public readonly payload: {
      id: string;
      code?: string;
      name?: string;
      isActive?: boolean;
      hasAttachments?: boolean;
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
