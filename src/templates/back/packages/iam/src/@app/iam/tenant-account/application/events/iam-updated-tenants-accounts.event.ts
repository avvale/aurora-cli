import { IamUpdatedTenantAccountEvent } from './iam-updated-tenant-account.event';

export class IamUpdatedTenantsAccountsEvent
{
    constructor(
        public readonly tenantsAccounts: IamUpdatedTenantAccountEvent[],
    ) {}
}
