import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedOutboxEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        messageId: string;
        accountRecipientIds: string[];
        tenantRecipientIds: string[];
        scopeRecipients: string[];
        tagRecipients: string[];
        meta: any;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
