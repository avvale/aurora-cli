import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingRawSQLSideEffectsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
