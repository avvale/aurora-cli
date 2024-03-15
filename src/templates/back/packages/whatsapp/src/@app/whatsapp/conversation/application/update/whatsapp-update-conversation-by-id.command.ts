import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateConversationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accounts?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
