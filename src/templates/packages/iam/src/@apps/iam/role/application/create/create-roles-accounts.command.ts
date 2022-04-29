export class CreateRolesAccountsCommand
{
    constructor(
        public readonly rolesAccounts: {
            roleId: string;
            accountId: string;
        } [],
    ) {}
}