import { IamUpdatedRoleAccountEvent } from './iam-updated-role-account.event';

export class IamUpdatedRolesAccountsEvent
{
    constructor(
        public readonly rolesAccounts: IamUpdatedRoleAccountEvent[],
    ) {}
}
