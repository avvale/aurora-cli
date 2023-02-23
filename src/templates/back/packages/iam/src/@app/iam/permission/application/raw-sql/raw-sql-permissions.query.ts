import { CQMetadata } from '@aurora-ts/core';

export class RawSQLPermissionsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}