import { CQMetadata } from '@aurora-ts/core';

export class UpsertJobRegistryCommand
{
    constructor(
        public readonly payload: {
            id: string;
            queueName?: string;
            jobId?: string;
            jobName?: string;
            tags?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}