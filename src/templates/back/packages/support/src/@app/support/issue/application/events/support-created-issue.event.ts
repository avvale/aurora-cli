import { CQMetadata } from '@aurorajs.dev/core';

export class SupportCreatedIssueEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        externalId: string;
        externalStatus: string;
        externalColorStatus: string;
        accountId: string;
        accountUsername: string;
        displayName: string;
        frontEnvironment: string;
        frontVersion: string;
        backEnvironment: string;
        backVersion: string;
        subject: string;
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
