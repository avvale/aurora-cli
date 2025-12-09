import { SupportUpdatedIssueEvent } from '@app/support/issue';
import { CQMetadata } from '@aurorajs.dev/core';

export class SupportUpdatedIssuesEvent {
    constructor(
        public readonly event: {
            payload: SupportUpdatedIssueEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
