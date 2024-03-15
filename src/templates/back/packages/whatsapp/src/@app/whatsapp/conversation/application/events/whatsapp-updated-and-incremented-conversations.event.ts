import { WhatsappUpdatedAndIncrementedConversationEvent } from './whatsapp-updated-and-incremented-conversation.event';

export class WhatsappUpdatedAndIncrementedConversationsEvent
{
    constructor(
        public readonly conversations: WhatsappUpdatedAndIncrementedConversationEvent[],
    ) {}
}
