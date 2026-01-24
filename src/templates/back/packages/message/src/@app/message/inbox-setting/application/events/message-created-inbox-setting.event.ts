import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreatedInboxSettingEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        accountId: string;
        lastReadMessageRowId: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
