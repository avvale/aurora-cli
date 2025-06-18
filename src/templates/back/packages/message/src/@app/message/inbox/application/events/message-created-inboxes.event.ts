import { MessageCreatedInboxEvent } from '@app/message/inbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreatedInboxesEvent
{
    constructor(
        public readonly event: {
            payload: MessageCreatedInboxEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
