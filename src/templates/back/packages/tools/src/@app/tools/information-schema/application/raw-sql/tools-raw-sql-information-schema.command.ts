import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsRawSQLInformationSchemaCommand {
  constructor(
    public readonly payload: {
      rawSQL: string;
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
