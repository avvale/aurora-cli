import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerCreatedQueueEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
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
