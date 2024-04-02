export class IamUpdatedAndIncrementedTenantAccountEvent
{
    constructor(
        public readonly tenantId: string,
        public readonly accountId: string,
    ) {}
}
