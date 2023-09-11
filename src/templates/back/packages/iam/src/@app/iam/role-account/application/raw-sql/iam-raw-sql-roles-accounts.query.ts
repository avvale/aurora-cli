import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLRolesAccountsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
