import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthRawSQLApplicationsClientsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
