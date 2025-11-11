import { ToolsUpdatedMigrationEvent } from '@app/tools/migration';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsUpdatedMigrationsEvent {
    constructor(
        public readonly event: {
            payload: ToolsUpdatedMigrationEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
