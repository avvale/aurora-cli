import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class QueueManagerUpdateAndIncrementQueuesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            prefix?: string;
            name?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
