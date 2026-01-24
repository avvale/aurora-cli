import { CQMetadata } from '@aurorajs.dev/core';

export class SupportDeletedCommentEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        parentId: string;
        rowId: number;
        externalId: string;
        externalParentId: string;
        issueId: string;
        accountId: string;
        accountUsername: string;
        displayName: string;
        description: string;
        attachments: any;
        screenRecording: any;
        meta: any;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
