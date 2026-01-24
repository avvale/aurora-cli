import { WhatsappUpdatedConversationEvent } from './whatsapp-updated-conversation.event';

export class WhatsappUpdatedConversationsEvent {
  constructor(
    public readonly conversations: WhatsappUpdatedConversationEvent[],
  ) {}
}
