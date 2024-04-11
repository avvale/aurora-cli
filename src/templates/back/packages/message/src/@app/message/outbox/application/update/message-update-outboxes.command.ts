import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class MessageUpdateOutboxesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            messageId?: string;
            sort?: number;
            accountRecipientIds?: string[];
            tenantRecipientIds?: string[];
            scopeRecipients?: string[];
            tagRecipients?: string[];
            meta?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
