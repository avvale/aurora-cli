import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedInboxEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                tenantIds: string[];
                messageId: string;
                sort: number;
                accountId: string;
                accountCode: string;
                isImportant: boolean;
                sentAt: string;
                subject: string;
                body: string;
                link: string;
                isInternalLink: boolean;
                image: any;
                icon: string;
                attachments: any;
                isRead: boolean;
                isReadAtLeastOnce: boolean;
                meta: any;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
