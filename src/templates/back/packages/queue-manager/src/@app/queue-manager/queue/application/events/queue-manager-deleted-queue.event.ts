import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerDeletedQueueEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                rowId: number;
                prefix: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
