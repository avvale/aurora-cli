import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsRawSQLInformationSchemasQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
