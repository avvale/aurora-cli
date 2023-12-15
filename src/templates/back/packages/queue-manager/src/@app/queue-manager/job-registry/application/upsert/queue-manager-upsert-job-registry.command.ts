import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerUpsertJobRegistryCommand
{
    constructor(
        public readonly payload: {
            id: string;
            queueName?: string;
            state?: string;
            jobId?: string;
            jobName?: string;
            tags?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
