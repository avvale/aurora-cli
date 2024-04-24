export class WhatsappDeletedTimelineEvent
{
    constructor(
        public readonly id: string,
        public readonly accounts: string[],
        public readonly wabaPhoneNumberId: string,
        public readonly wabaContactId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
