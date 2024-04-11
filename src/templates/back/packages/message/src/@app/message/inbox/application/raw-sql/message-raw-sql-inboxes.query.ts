import { CQMetadata } from '@aurorajs.dev/core';

export class MessageRawSQLInboxesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
