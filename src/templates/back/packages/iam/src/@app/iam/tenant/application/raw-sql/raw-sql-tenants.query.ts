import { CQMetadata } from '@aurora-ts/core';

export class RawSQLTenantsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}