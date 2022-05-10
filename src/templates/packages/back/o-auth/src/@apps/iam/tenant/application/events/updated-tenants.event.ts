import { UpdatedTenantEvent } from './updated-tenant.event';

export class UpdatedTenantsEvent
{
    constructor(
        public readonly tenants: UpdatedTenantEvent[],
    ) {}
}