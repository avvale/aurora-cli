import { WhatsappCreatedMessageEvent } from './whatsapp-created-message.event';

export class WhatsappCreatedMessagesEvent {
  constructor(public readonly messages: WhatsappCreatedMessageEvent[]) {}
}
