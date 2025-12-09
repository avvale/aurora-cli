import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedWebhookEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                rowId: number;
                name: string;
                service: string;
                endpoint: string;
                externalId: string;
                events: string[];
                secret: string;
                meta: any;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
