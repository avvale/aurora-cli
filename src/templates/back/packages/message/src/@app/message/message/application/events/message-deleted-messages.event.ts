import { MessageDeletedMessageEvent } from '@app/message/message';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedMessagesEvent {
  constructor(
    public readonly event: {
      payload: MessageDeletedMessageEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
