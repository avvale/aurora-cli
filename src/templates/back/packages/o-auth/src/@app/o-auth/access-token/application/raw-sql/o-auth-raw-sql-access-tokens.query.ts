import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthRawSQLAccessTokensQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
