import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLBoundedContextsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
