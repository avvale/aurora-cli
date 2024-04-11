export class MessageCreatedInboxSettingEvent
{
    constructor(
        public readonly id: string,
        public readonly accountId: string,
        public readonly sort: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
