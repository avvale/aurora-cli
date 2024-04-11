import { CQMetadata } from '@aurorajs.dev/core';

export class MessageRawSQLMessagesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
