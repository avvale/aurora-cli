import { CQMetadata } from '@aurorajs.dev/core';

export class CommonRawSQLAttachmentLibrariesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
