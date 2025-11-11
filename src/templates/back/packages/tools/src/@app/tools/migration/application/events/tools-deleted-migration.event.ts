import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedMigrationEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                rowId: number;
                name: string;
                version: string;
                isActive: boolean;
                isExecuted: boolean;
                upScript: string;
                downScript: string;
                sort: number;
                executedAt: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
