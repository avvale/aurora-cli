import { MessageUpdatedInboxEvent } from '@app/message/inbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedInboxesEvent {
    constructor(
        public readonly event: {
            payload: MessageUpdatedInboxEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
