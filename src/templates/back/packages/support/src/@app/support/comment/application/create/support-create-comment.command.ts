import { CQMetadata } from '@aurorajs.dev/core';

export class SupportCreateCommentCommand {
    constructor(
        public readonly payload: {
            id: string;
            externalId?: string;
            issueId?: string;
            accountId?: string;
            accountUsername?: string;
            displayName?: string;
            description: string;
            attachments?: any;
            screenRecording?: any;
            meta?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
