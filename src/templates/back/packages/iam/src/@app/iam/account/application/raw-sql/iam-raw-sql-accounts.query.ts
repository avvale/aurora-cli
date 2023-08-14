import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLAccountsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
