import { CQMetadata } from '@aurora-ts/core';

export class RawSQLQueuesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}