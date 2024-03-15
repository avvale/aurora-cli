import { WhatsappUpdatedAndIncrementedMessageEvent } from './whatsapp-updated-and-incremented-message.event';

export class WhatsappUpdatedAndIncrementedMessagesEvent
{
    constructor(
        public readonly messages: WhatsappUpdatedAndIncrementedMessageEvent[],
    ) {}
}
