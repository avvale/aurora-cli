import { MessageCreatedOutboxEvent } from './message-created-outbox.event';

export class MessageCreatedOutboxesEvent
{
    constructor(
        public readonly outboxes: MessageCreatedOutboxEvent[],
    ) {}
}
