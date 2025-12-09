import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreateMessagesCommand {
    constructor(
        public readonly payload: {
            id: string;
            tenantIds?: string[];
            status: string;
            accountRecipientIds?: string[];
            tenantRecipientIds?: string[];
            scopeRecipients?: string[];
            tagRecipients?: string[];
            sendAt?: string;
            isImportant: boolean;
            subject: string;
            body: string;
            link?: string;
            isInternalLink?: boolean;
            image?: any;
            icon?: string;
            attachments?: any;
            totalRecipients: number;
            reads: number;
            meta?: any;
        }[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
