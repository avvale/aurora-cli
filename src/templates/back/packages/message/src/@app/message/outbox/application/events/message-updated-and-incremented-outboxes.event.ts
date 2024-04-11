import { MessageUpdatedAndIncrementedOutboxEvent } from './message-updated-and-incremented-outbox.event';

export class MessageUpdatedAndIncrementedOutboxesEvent
{
    constructor(
        public readonly outboxes: MessageUpdatedAndIncrementedOutboxEvent[],
    ) {}
}
