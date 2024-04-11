export class MessageUpdatedAndIncrementedOutboxEvent
{
    constructor(
        public readonly id: string,
        public readonly messageId: string,
        public readonly sort: number,
        public readonly accountRecipientIds: string[],
        public readonly tenantRecipientIds: string[],
        public readonly scopeRecipients: string[],
        public readonly tagRecipients: string[],
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
