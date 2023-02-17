import { CQMetadata } from '@aurora-ts/core';

export class RawSQLSideEffectsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}