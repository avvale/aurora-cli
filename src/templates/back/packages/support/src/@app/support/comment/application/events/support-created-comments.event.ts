import { SupportCreatedCommentEvent } from '@app/support/comment';
import { CQMetadata } from '@aurorajs.dev/core';

export class SupportCreatedCommentsEvent {
  constructor(
    public readonly event: {
      payload: SupportCreatedCommentEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
