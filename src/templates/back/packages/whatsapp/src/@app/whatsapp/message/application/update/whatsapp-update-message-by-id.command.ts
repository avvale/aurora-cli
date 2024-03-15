import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateMessageByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            whatsappMessageId?: string;
            conversationId?: string;
            direction?: string;
            accountId?: string;
            displayPhoneNumber?: string;
            phoneNumberId?: string;
            type?: string;
            payload?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
