import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedWebhookLogEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        url: string;
        headerRequest: any;
        bodyRequest: any;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
