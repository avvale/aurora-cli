import { CQMetadata } from '@aurorajs.dev/core';

export class CommonRawSQLAttachmentsQuery {
  constructor(
    public readonly rawSQL?: string,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
