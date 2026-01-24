import { MessageUpdatedOutboxEvent } from '@app/message/outbox';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedOutboxesEvent {
  constructor(
    public readonly event: {
      payload: MessageUpdatedOutboxEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
