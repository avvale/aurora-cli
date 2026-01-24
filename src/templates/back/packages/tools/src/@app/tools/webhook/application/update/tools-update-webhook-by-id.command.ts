import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateWebhookByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      name?: string;
      service?: string;
      endpoint?: string;
      externalId?: string;
      events?: string[];
      secret?: string;
      meta?: any;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
