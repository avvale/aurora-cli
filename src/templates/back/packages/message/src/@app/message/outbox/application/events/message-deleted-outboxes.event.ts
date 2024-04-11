import { MessageDeletedOutboxEvent } from './message-deleted-outbox.event';

export class MessageDeletedOutboxesEvent
{
    constructor(
        public readonly outboxes: MessageDeletedOutboxEvent[],
    ) {}
}
