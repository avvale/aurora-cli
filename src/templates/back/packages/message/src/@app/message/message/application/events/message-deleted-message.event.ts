import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedMessageEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                tenantIds: string[];
                status: string;
                accountRecipientIds: string[];
                tenantRecipientIds: string[];
                scopeRecipients: string[];
                tagRecipients: string[];
                sendAt: string;
                isImportant: boolean;
                subject: string;
                body: string;
                link: string;
                isInternalLink: boolean;
                image: any;
                icon: string;
                attachments: any;
                totalRecipients: number;
                reads: number;
                meta: any;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
