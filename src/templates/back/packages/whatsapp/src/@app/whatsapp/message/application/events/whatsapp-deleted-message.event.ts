export class WhatsappDeletedMessageEvent
{
    constructor(
        public readonly id: string,
        public readonly wabaMessageId: string,
        public readonly timelineId: string,
        public readonly conversationId: string,
        public readonly statuses: string[],
        public readonly direction: string,
        public readonly accountId: string,
        public readonly wabaContactId: string,
        public readonly contactName: string,
        public readonly type: string,
        public readonly payload: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
