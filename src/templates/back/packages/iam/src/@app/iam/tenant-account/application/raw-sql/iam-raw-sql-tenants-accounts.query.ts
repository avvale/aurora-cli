import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLTenantsAccountsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
