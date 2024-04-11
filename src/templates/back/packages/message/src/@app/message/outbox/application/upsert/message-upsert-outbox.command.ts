import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpsertOutboxCommand
{
    constructor(
        public readonly payload: {
            id: string;
            messageId?: string;
            sort?: number;
            accountRecipientIds?: string[];
            tenantRecipientIds?: string[];
            scopeRecipients?: string[];
            tagRecipients?: string[];
            meta?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
