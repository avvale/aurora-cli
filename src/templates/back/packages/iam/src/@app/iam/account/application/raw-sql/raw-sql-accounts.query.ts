import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLAccountsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}