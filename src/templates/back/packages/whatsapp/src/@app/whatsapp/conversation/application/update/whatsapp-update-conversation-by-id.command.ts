import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateConversationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            wabaConversationId?: string;
            timelineId?: string;
            wabaContactId?: string;
            expiration?: string;
            category?: string;
            isBillable?: boolean;
            pricingModel?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
