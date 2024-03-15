import { WhatsappDeletedMessageEvent } from './whatsapp-deleted-message.event';

export class WhatsappDeletedMessagesEvent
{
    constructor(
        public readonly messages: WhatsappDeletedMessageEvent[],
    ) {}
}
