import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingRawSQLHttpCommunicationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
