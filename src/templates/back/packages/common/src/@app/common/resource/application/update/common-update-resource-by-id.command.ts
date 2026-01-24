import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateResourceByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      code?: string;
      name?: string;
      isActive?: boolean;
      hasAttachments?: boolean;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
