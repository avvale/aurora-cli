import { CQMetadata } from '@aurora-ts/core';

export class RawSQLRefreshTokensQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}