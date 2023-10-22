import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class QueueManagerUpdateJobsRegistryCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            queueName?: string;
            state?: string;
            jobId?: string;
            jobName?: string;
            tags?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
