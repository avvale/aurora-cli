import { CQMetadata } from '@aurora-ts/core';

export class RawSQLRolesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}