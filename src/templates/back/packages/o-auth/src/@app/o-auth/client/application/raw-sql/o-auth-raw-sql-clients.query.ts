import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthRawSQLClientsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
