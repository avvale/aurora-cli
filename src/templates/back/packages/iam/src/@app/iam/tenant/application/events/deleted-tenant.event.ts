export class DeletedTenantEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly code: string,
        public readonly logo: string,
        public readonly isActive: boolean,
        public readonly meta: any,
        public readonly accountIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}