import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappUpsertMessageCommand
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
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
