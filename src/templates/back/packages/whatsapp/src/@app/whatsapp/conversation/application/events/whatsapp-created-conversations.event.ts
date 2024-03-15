import { WhatsappCreatedConversationEvent } from './whatsapp-created-conversation.event';

export class WhatsappCreatedConversationsEvent
{
    constructor(
        public readonly conversations: WhatsappCreatedConversationEvent[],
    ) {}
}
