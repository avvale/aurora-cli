export class WhatsappDeletedConversationEvent
{
    constructor(
        public readonly id: string,
        public readonly wabaConversationId: string,
        public readonly timelineId: string,
        public readonly wabaContactId: string,
        public readonly expiration: string,
        public readonly category: string,
        public readonly isBillable: boolean,
        public readonly pricingModel: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
