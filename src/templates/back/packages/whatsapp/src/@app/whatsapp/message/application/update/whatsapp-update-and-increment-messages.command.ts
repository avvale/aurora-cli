import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateAndIncrementMessagesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            whatsappMessageId?: string;
            conversationId?: string;
            direction?: string;
            accountId?: string;
            displayPhoneNumber?: string;
            phoneNumberId?: string;
            type?: string;
            payload?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
