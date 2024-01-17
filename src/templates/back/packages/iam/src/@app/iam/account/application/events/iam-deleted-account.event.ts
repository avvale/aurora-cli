export class IamDeletedAccountEvent
{
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly code: string,
        public readonly email: string,
        public readonly isActive: boolean,
        public readonly clientId: string,
        public readonly scopes: string[],
        public readonly dApplicationCodes: string[],
        public readonly dPermissions: any,
        public readonly dTenants: string[],
        public readonly meta: any,
        public readonly roleIds: string[],
        public readonly tenantIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
