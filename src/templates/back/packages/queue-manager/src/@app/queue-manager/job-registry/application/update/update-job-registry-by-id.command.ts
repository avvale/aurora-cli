import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateJobRegistryByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            queueName?: string;
            jobId?: string;
            jobName?: string;
            tags?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}