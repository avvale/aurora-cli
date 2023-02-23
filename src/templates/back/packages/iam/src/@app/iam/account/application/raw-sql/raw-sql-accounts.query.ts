import { CQMetadata } from '@aurora-ts/core';

export class RawSQLAccountsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}