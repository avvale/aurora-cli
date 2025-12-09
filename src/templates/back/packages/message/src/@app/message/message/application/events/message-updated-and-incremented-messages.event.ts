import { MessageUpdatedAndIncrementedMessageEvent } from '@app/message/message';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedAndIncrementedMessagesEvent {
    constructor(
        public readonly event: {
            payload: MessageUpdatedAndIncrementedMessageEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
