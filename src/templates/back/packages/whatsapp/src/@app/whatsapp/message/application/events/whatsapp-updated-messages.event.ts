import { WhatsappUpdatedMessageEvent } from './whatsapp-updated-message.event';

export class WhatsappUpdatedMessagesEvent {
  constructor(public readonly messages: WhatsappUpdatedMessageEvent[]) {}
}
