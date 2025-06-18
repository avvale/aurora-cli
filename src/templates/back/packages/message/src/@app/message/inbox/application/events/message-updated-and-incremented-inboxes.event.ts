import { MessageUpdatedAndIncrementedInboxEvent } from '@app/message/inbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedAndIncrementedInboxesEvent
{
    constructor(
        public readonly event: {
            payload: MessageUpdatedAndIncrementedInboxEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
