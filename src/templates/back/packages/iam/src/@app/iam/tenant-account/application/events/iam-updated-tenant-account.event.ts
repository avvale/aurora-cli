export class IamUpdatedTenantAccountEvent
{
    constructor(
        public readonly tenantId: string,
        public readonly accountId: string,
    ) {}
}
