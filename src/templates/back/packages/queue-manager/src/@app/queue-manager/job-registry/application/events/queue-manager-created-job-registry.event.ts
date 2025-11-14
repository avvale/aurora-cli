import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerCreatedJobRegistryEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                queueName: string;
                state: string;
                jobId: string;
                jobName: string;
                tags: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
