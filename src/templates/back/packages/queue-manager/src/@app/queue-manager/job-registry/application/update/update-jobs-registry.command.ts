import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateJobsRegistryCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            queueName?: string;
            jobId?: string;
            jobName?: string;
            tags?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}