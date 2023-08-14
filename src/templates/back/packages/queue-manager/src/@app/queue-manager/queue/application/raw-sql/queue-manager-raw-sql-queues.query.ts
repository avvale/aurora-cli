import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerRawSQLQueuesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
