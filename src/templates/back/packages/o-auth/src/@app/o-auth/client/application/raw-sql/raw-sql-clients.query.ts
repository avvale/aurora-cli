import { CQMetadata } from '@aurora-ts/core';

export class RawSQLClientsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}