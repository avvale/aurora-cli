import { IamUpdatedAndIncrementedTenantAccountEvent } from './iam-updated-and-incremented-tenant-account.event';

export class IamUpdatedAndIncrementedTenantsAccountsEvent
{
    constructor(
        public readonly tenantsAccounts: IamUpdatedAndIncrementedTenantAccountEvent[],
    ) {}
}
