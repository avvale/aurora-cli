import { WhatsappDeletedConversationEvent } from './whatsapp-deleted-conversation.event';

export class WhatsappDeletedConversationsEvent {
  constructor(
    public readonly conversations: WhatsappDeletedConversationEvent[],
  ) {}
}
