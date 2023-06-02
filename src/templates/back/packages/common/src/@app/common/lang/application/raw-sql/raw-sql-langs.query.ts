import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLLangsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}