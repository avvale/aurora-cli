import { MessageUpdatedMessageEvent } from './message-updated-message.event';

export class MessageUpdatedMessagesEvent
{
    constructor(
        public readonly messages: MessageUpdatedMessageEvent[],
    ) {}
}
