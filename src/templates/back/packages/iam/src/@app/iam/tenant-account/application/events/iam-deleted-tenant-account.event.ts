export class IamDeletedTenantAccountEvent
{
    constructor(
        public readonly tenantId: string,
        public readonly accountId: string,
    ) {}
}
