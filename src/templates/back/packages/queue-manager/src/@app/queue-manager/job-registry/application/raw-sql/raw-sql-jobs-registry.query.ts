import { CQMetadata } from '@aurora-ts/core';

export class RawSQLJobsRegistryQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}