import { SupportDeletedCommentEvent } from '@app/support/comment';
import { CQMetadata } from '@aurorajs.dev/core';

export class SupportDeletedCommentsEvent {
  constructor(
    public readonly event: {
      payload: SupportDeletedCommentEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
