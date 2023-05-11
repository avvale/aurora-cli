import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLQueuesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}