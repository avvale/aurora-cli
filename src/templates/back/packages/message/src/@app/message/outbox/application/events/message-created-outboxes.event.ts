import { MessageCreatedOutboxEvent } from '@app/message/outbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreatedOutboxesEvent {
    constructor(
        public readonly event: {
            payload: MessageCreatedOutboxEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
