import { CQMetadata } from '@aurora-ts/core';

export class RawSQLBoundedContextsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}