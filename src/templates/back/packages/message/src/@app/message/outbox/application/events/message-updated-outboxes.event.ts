import { MessageUpdatedOutboxEvent } from './message-updated-outbox.event';

export class MessageUpdatedOutboxesEvent
{
    constructor(
        public readonly outboxes: MessageUpdatedOutboxEvent[],
    ) {}
}
