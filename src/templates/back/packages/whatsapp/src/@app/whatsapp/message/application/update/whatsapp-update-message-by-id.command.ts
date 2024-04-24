import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateMessageByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            wabaMessageId?: string;
            timelineId?: string;
            conversationId?: string;
            statuses?: string[];
            direction?: string;
            accountId?: string;
            wabaContactId?: string;
            contactName?: string;
            type?: string;
            payload?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
