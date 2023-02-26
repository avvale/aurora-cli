import { CQMetadata } from '@aurora-ts/core';

export class RawSQLScopesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}