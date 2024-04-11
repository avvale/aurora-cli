import { MessageUpdatedInboxEvent } from './message-updated-inbox.event';

export class MessageUpdatedInboxesEvent
{
    constructor(
        public readonly inboxes: MessageUpdatedInboxEvent[],
    ) {}
}
