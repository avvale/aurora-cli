import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLTagsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
