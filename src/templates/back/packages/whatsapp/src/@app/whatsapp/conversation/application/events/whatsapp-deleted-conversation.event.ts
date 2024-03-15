export class WhatsappDeletedConversationEvent
{
    constructor(
        public readonly id: string,
        public readonly accounts: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
