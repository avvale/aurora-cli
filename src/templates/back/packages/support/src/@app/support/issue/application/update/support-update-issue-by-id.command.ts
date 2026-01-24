import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class SupportUpdateIssueByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      externalId?: string;
      externalStatus?: string;
      externalColorStatus?: string;
      accountId?: string;
      accountUsername?: string;
      displayName?: string;
      frontEnvironment?: string;
      frontVersion?: string;
      backEnvironment?: string;
      backVersion?: string;
      subject?: string;
      description?: string;
      attachments?: any;
      screenRecording?: any;
      meta?: any;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
