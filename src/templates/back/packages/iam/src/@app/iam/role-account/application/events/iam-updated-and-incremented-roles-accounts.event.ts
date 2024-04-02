import { IamUpdatedAndIncrementedRoleAccountEvent } from './iam-updated-and-incremented-role-account.event';

export class IamUpdatedAndIncrementedRolesAccountsEvent
{
    constructor(
        public readonly rolesAccounts: IamUpdatedAndIncrementedRoleAccountEvent[],
    ) {}
}
