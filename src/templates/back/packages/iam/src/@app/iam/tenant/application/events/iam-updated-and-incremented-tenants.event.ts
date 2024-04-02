import { IamUpdatedAndIncrementedTenantEvent } from './iam-updated-and-incremented-tenant.event';

export class IamUpdatedAndIncrementedTenantsEvent
{
    constructor(
        public readonly tenants: IamUpdatedAndIncrementedTenantEvent[],
    ) {}
}
