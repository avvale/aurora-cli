import { DeletedTenantEvent } from './deleted-tenant.event';

export class DeletedTenantsEvent
{
    constructor(
        public readonly tenants: DeletedTenantEvent[],
    ) {}
}