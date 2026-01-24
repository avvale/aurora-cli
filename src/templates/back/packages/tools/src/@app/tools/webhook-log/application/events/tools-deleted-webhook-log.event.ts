import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedWebhookLogEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
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
