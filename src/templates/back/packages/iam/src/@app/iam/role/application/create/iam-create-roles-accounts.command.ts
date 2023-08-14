export class IamCreateRolesAccountsCommand
{
    constructor(
        public readonly rolesAccounts: {
            roleId: string;
            accountId: string;
        } [],
    ) {}
}