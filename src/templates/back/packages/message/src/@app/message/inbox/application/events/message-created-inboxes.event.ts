import { MessageCreatedInboxEvent } from './message-created-inbox.event';

export class MessageCreatedInboxesEvent
{
    constructor(
        public readonly inboxes: MessageCreatedInboxEvent[],
    ) {}
}
