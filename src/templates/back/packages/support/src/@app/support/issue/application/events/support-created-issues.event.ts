import { SupportCreatedIssueEvent } from '@app/support/issue';
import { CQMetadata } from '@aurorajs.dev/core';

export class SupportCreatedIssuesEvent {
    constructor(
        public readonly event: {
            payload: SupportCreatedIssueEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
