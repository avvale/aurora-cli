import { CreatedTenantEvent } from './created-tenant.event';

export class CreatedTenantsEvent
{
    constructor(
        public readonly tenants: CreatedTenantEvent[],
    ) {}
}