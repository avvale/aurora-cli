import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreateInboxSettingCommand {
  constructor(
    public readonly payload: {
      id: string;
      accountId: string;
      lastReadMessageRowId: number;
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
