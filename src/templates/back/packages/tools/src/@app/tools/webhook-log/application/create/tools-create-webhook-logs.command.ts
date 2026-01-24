import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreateWebhookLogsCommand {
  constructor(
    public readonly payload: {
      id: string;
      url: string;
      headerRequest?: any;
      bodyRequest?: any;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
