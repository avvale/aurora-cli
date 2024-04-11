import { MessageUpdatedAndIncrementedInboxEvent } from './message-updated-and-incremented-inbox.event';

export class MessageUpdatedAndIncrementedInboxesEvent
{
    constructor(
        public readonly inboxes: MessageUpdatedAndIncrementedInboxEvent[],
    ) {}
}
