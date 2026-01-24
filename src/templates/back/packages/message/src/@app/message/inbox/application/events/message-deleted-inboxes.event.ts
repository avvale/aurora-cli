import { MessageDeletedInboxEvent } from '@app/message/inbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedInboxesEvent {
  constructor(
    public readonly event: {
      payload: MessageDeletedInboxEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
