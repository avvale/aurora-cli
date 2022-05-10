import { CQMetadata, ICommandBus, QueryStatement } from 'aurora-ts-core';
import { AccountPermissions } from '../../iam.types';
import { AccountResponse } from './account.response';
import { RoleResponse } from '../../role/domain/role.response';
import { UpdateAccountByIdCommand } from '../application/update/update-account-by-id.command';

export class AccountHelper
{
    public static createPermissions(roles: RoleResponse[]): AccountPermissions
    {
        // create permission for new account
        const accountPermissions: AccountPermissions = {
            all: [],
        };
        const allPermissions = [];

        // iterate roles
        for (const role of roles)
        {
            const rolePermissions = [];
            // iterate permissions of each role
            for (const permission of role.permissions)
            {
                rolePermissions.push(permission.name);
                if (allPermissions.indexOf(permission.name) === -1) allPermissions.push(permission.name);
            }
            accountPermissions[role.id] = rolePermissions;
        }
        accountPermissions.all = allPermissions;

        return accountPermissions;
    }

    public static async deleteTenantFromAccounts(
        commandBus: ICommandBus,
        tenantId: string,
        accounts: AccountResponse[],
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        for (const account of accounts)
        {
            // check that tenant exist in account
            if (account.dTenants.indexOf(tenantId) !== -1)
            {
                const currentTenants = account.dTenants;

                // TODO revisar esto, hacer la operación en solo un update
                // delete tenant and update account
                await commandBus.dispatch(new UpdateAccountByIdCommand({
                    id               : account.id,
                    type             : undefined,
                    email            : undefined,
                    isActive         : undefined,
                    clientId         : undefined,
                    dApplicationCodes: undefined,
                    dPermissions     : undefined,
                    data             : undefined,
                    roleIds          : undefined,
                    tenantIds        : currentTenants.filter(tenantId => tenantId !== tenantId),
                }, constraint, cQMetadata));
            }
        }
    }
}