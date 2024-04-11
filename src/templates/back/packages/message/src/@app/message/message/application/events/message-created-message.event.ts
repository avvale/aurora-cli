export class MessageCreatedMessageEvent
{
    constructor(
        public readonly id: string,
        public readonly tenantIds: string[],
        public readonly status: string,
        public readonly accountRecipientIds: string[],
        public readonly tenantRecipientIds: string[],
        public readonly scopeRecipients: string[],
        public readonly tagRecipients: string[],
        public readonly sendAt: string,
        public readonly isImportant: boolean,
        public readonly subject: string,
        public readonly body: string,
        public readonly link: string,
        public readonly isInternalLink: boolean,
        public readonly image: any,
        public readonly icon: string,
        public readonly attachments: any,
        public readonly totalRecipients: number,
        public readonly reads: number,
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
