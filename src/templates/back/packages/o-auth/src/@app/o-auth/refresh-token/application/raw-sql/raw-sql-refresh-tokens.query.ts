import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLRefreshTokensQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}