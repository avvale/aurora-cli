import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLClientsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}