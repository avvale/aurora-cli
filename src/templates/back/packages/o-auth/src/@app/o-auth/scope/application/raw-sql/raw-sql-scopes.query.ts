import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLScopesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}