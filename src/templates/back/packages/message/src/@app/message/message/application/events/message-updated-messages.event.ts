import { MessageUpdatedMessageEvent } from '@app/message/message';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedMessagesEvent {
  constructor(
    public readonly event: {
      payload: MessageUpdatedMessageEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
