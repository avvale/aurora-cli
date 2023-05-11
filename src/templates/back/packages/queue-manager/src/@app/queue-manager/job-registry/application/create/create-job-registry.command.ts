import { CQMetadata } from '@aurorajs.dev/core';

export class CreateJobRegistryCommand
{
    constructor(
        public readonly payload: {
            id: string;
            queueName: string;
            jobId: string;
            jobName?: string;
            tags?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}