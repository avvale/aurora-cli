import { IamDeletedTenantEvent } from './iam-deleted-tenant.event';

export class IamDeletedTenantsEvent
{
    constructor(
        public readonly tenants: IamDeletedTenantEvent[],
    ) {}
}
