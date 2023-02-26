import { CQMetadata } from '@aurora-ts/core';

export class RawSQLApplicationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}