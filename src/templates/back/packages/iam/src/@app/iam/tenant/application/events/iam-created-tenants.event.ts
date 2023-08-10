import { IamCreatedTenantEvent } from './iam-created-tenant.event';

export class IamCreatedTenantsEvent
{
    constructor(
        public readonly tenants: IamCreatedTenantEvent[],
    ) {}
}
