import { CQMetadata } from '@aurorajs.dev/core';

export class CommonRawSQLAttachmentFamiliesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
