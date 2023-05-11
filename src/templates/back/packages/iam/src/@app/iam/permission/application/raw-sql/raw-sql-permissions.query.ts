import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLPermissionsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}