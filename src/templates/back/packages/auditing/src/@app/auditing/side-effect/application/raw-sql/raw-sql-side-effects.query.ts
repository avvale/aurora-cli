import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLSideEffectsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}