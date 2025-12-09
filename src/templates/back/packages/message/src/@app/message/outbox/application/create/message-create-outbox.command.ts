import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreateOutboxCommand {
    constructor(
        public readonly payload: {
            id: string;
            messageId: string;
            accountRecipientIds?: string[];
            tenantRecipientIds?: string[];
            scopeRecipients?: string[];
            tagRecipients?: string[];
            meta?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
