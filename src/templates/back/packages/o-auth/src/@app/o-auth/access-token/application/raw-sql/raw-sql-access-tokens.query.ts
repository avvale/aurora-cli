import { CQMetadata } from '@aurora-ts/core';

export class RawSQLAccessTokensQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}