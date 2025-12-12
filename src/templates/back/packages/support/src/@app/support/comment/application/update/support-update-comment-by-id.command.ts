import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class SupportUpdateCommentByIdCommand {
    constructor(
        public readonly payload: {
            id: string;
            parentId?: string;
            externalId?: string;
            externalParentId?: string;
            issueId?: string;
            accountId?: string;
            accountUsername?: string;
            displayName?: string;
            description?: string;
            attachments?: any;
            screenRecording?: any;
            meta?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
