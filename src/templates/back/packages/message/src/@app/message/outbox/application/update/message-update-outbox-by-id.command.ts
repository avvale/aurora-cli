import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class MessageUpdateOutboxByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      messageId?: string;
      accountRecipientIds?: string[];
      tenantRecipientIds?: string[];
      scopeRecipients?: string[];
      tagRecipients?: string[];
      meta?: any;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
