import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappCreateConversationsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            wabaConversationId: string;
            timelineId: string;
            wabaContactId: string;
            expiration: string;
            category: string;
            isBillable: boolean;
            pricingModel: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
