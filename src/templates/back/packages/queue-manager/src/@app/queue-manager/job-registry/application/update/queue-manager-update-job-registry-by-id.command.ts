import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerUpdateJobRegistryByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            queueName?: string;
            state?: string;
            jobId?: string;
            jobName?: string;
            tags?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
