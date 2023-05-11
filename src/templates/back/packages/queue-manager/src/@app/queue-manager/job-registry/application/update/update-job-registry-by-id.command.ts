import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

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