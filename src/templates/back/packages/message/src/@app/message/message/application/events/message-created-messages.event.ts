import { MessageCreatedMessageEvent } from '@app/message/message';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreatedMessagesEvent
{
    constructor(
        public readonly event: {
            payload: MessageCreatedMessageEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
