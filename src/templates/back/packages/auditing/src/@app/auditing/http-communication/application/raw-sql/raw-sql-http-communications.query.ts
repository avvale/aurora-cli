import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLHttpCommunicationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}