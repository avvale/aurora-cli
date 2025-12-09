import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class MessageUpdateInboxByIdCommand {
    constructor(
        public readonly payload: {
            id: string;
            tenantIds?: string[];
            messageId?: string;
            messageRowId?: number;
            accountId?: string;
            accountCode?: string;
            isImportant?: boolean;
            sentAt?: string;
            subject?: string;
            body?: string;
            link?: string;
            isInternalLink?: boolean;
            image?: any;
            icon?: string;
            attachments?: any;
            isRead?: boolean;
            isReadAtLeastOnce?: boolean;
            meta?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
