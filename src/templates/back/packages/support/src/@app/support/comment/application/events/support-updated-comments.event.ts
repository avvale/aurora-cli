import { SupportUpdatedCommentEvent } from '@app/support/comment';
import { CQMetadata } from '@aurorajs.dev/core';

export class SupportUpdatedCommentsEvent {
    constructor(
        public readonly event: {
            payload: SupportUpdatedCommentEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
