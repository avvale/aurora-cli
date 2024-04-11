import { MessageDeletedMessageEvent } from './message-deleted-message.event';

export class MessageDeletedMessagesEvent
{
    constructor(
        public readonly messages: MessageDeletedMessageEvent[],
    ) {}
}
