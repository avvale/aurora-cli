import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappRawSQLMessagesQuery {
  constructor(
    public readonly rawSQL?: string,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
