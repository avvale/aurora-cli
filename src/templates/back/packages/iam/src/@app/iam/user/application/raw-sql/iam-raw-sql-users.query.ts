import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLUsersQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
