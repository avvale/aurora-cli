import { IamUpdatedTenantEvent } from './iam-updated-tenant.event';

export class IamUpdatedTenantsEvent
{
    constructor(
        public readonly tenants: IamUpdatedTenantEvent[],
    ) {}
}
