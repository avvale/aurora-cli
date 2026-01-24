import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateWebhookLogByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      url?: string;
      headerRequest?: any;
      bodyRequest?: any;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
