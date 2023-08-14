import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthRawSQLApplicationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
