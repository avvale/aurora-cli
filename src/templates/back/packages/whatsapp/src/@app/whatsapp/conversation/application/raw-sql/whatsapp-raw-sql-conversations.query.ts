import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappRawSQLConversationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
