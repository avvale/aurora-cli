import { IamDeletedTenantAccountEvent } from './iam-deleted-tenant-account.event';

export class IamDeletedTenantsAccountsEvent
{
    constructor(
        public readonly tenantsAccounts: IamDeletedTenantAccountEvent[],
    ) {}
}
