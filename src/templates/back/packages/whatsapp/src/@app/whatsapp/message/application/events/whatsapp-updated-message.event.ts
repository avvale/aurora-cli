export class WhatsappUpdatedMessageEvent
{
    constructor(
        public readonly id: string,
        public readonly whatsappMessageId: string,
        public readonly conversationId: string,
        public readonly direction: string,
        public readonly accountId: string,
        public readonly displayPhoneNumber: string,
        public readonly phoneNumberId: string,
        public readonly type: string,
        public readonly payload: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
