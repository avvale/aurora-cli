import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLAccessTokensQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}