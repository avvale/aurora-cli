import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class MessageUpdateInboxSettingsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            accountId?: string;
            sort?: number;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
