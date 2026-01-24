import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedInformationSchemaRequestEvent {
  constructor(
    public readonly event: {
      payload: {
        rawSql: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
