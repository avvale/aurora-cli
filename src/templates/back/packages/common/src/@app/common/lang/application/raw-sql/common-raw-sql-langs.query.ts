import { CQMetadata } from '@aurorajs.dev/core';

export class CommonRawSQLLangsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
