import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateAndIncrementConversationsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            accounts?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
