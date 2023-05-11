import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLUsersQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}