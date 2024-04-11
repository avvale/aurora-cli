import { MessageDeletedInboxEvent } from './message-deleted-inbox.event';

export class MessageDeletedInboxesEvent
{
    constructor(
        public readonly inboxes: MessageDeletedInboxEvent[],
    ) {}
}
