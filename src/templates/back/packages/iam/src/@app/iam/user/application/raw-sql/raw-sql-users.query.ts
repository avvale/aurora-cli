import { CQMetadata } from '@aurora-ts/core';

export class RawSQLUsersQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}