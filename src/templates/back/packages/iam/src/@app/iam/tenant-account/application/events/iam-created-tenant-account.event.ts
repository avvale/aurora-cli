export class IamCreatedTenantAccountEvent
{
    constructor(
        public readonly tenantId: string,
        public readonly accountId: string,
    ) {}
}
