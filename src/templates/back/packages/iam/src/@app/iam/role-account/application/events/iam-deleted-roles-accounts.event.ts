import { IamDeletedRoleAccountEvent } from './iam-deleted-role-account.event';

export class IamDeletedRolesAccountsEvent
{
    constructor(
        public readonly rolesAccounts: IamDeletedRoleAccountEvent[],
    ) {}
}
