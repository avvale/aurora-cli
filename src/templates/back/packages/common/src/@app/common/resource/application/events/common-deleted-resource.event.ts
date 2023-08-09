export class CommonDeletedResourceEvent
{
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly name: string,
        public readonly isActive: boolean,
        public readonly hasAttachments: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
