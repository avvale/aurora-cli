import { IamCreatedRoleAccountEvent } from './iam-created-role-account.event';

export class IamCreatedRolesAccountsEvent
{
    constructor(
        public readonly rolesAccounts: IamCreatedRoleAccountEvent[],
    ) {}
}
