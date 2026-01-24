import { MessageDeletedOutboxEvent } from '@app/message/outbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedOutboxesEvent {
  constructor(
    public readonly event: {
      payload: MessageDeletedOutboxEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
