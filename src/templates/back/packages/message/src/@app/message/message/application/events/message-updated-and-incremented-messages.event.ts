import { MessageUpdatedAndIncrementedMessageEvent } from './message-updated-and-incremented-message.event';

export class MessageUpdatedAndIncrementedMessagesEvent
{
    constructor(
        public readonly messages: MessageUpdatedAndIncrementedMessageEvent[],
    ) {}
}
