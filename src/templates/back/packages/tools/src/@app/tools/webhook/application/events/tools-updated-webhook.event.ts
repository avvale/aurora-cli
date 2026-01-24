import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsUpdatedWebhookEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        name: string;
        service: string;
        endpoint: string;
        externalId: string;
        events: string[];
        secret: string;
        meta: any;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
