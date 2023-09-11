import { IamCreatedTenantAccountEvent } from './iam-created-tenant-account.event';

export class IamCreatedTenantsAccountsEvent
{
    constructor(
        public readonly tenantsAccounts: IamCreatedTenantAccountEvent[],
    ) {}
}
