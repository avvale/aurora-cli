import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class MessageUpdateInboxSettingByIdCommand {
    constructor(
        public readonly payload: {
            id: string;
            accountId?: string;
            lastReadMessageRowId?: number;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
