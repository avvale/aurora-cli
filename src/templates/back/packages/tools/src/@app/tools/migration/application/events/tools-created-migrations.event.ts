import { ToolsCreatedMigrationEvent } from '@app/tools/migration';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedMigrationsEvent {
  constructor(
    public readonly event: {
      payload: ToolsCreatedMigrationEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
