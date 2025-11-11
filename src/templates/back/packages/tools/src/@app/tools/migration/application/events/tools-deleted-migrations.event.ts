import { ToolsDeletedMigrationEvent } from '@app/tools/migration';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedMigrationsEvent {
    constructor(
        public readonly event: {
            payload: ToolsDeletedMigrationEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
