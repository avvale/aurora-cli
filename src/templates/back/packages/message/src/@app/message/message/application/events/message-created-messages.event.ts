import { MessageCreatedMessageEvent } from './message-created-message.event';

export class MessageCreatedMessagesEvent
{
    constructor(
        public readonly messages: MessageCreatedMessageEvent[],
    ) {}
}
