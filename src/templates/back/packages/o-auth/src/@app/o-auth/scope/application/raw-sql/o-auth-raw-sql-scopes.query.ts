import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthRawSQLScopesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
