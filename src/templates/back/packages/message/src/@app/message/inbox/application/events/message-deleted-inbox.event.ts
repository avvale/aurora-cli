import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedInboxEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                rowId: number;
                tenantIds: string[];
                messageId: string;
                messageRowId: number;
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
