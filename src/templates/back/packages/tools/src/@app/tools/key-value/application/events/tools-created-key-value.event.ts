import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedKeyValueEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                key: string;
                type: string;
                value: string;
                isCached: boolean;
                isActive: boolean;
                description: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
