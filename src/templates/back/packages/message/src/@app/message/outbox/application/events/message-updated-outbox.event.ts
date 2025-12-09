import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedOutboxEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                messageId: string;
                accountRecipientIds: string[];
                tenantRecipientIds: string[];
                scopeRecipients: string[];
                tagRecipients: string[];
                meta: any;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
