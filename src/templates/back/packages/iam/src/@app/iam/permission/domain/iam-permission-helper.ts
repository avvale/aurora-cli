import { ICommandBus, IQueryBus, SeederPermission } from '@aurorajs.dev/core';
import { IamCreatePermissionsCommand } from '../application/create/iam-create-permissions.command';
import { IamAccountResponse, IamFindAccountByIdQuery, IamUpdateAccountByIdCommand } from '@app/iam/account';
import { AccountPermissions } from '../../iam.types';

// ---- customizations ----
import { IamCreatePermissionsRolesCommand } from '@app/iam/permission-role';

export class IamPermissionHelper
{
    static administratorAccountId = '948a5308-a49d-42dc-9ea3-7490e120000b';
    static administratorUserId    = 'b94dd025-c538-4a37-b852-a7fee35a3561';
    static administratorRoleId    = '99b06044-fff5-4267-9314-4bae9f909010';

    /**
     * Create permissions and assign to administrator role and administrator account
     *
     * @param commandBus
     * @param queryBus
     * @param permissions
     */
    static async createPermissions(
        commandBus: ICommandBus,
        queryBus: IQueryBus,
        permissions: SeederPermission[],
    ): Promise<void>
    {
        // get administrator account
        const administratorAccount = await queryBus.ask(new IamFindAccountByIdQuery(IamPermissionHelper.administratorAccountId));

        // insert bounded contexts and permissions
        await commandBus.dispatch(new IamCreatePermissionsCommand(permissions));

        // set all permissions to administration role
        const permissionsRoles = permissions.map(permission =>
        {
            return {
                permissionId: permission.id,
                roleId      : IamPermissionHelper.administratorRoleId,
            };
        });
        await commandBus.dispatch(new IamCreatePermissionsRolesCommand(permissionsRoles));

        const accountPermissions = IamPermissionHelper.updateAccountPermissions(
            IamPermissionHelper.administratorRoleId,
            administratorAccount,
            permissions,
        );

        // set all permissions denormalized to administration account
        await commandBus.dispatch(new IamUpdateAccountByIdCommand({
            id               : IamPermissionHelper.administratorAccountId,
            type             : undefined,
            email            : undefined,
            isActive         : undefined,
            clientId         : undefined,
            dApplicationCodes: undefined,
            dPermissions     : accountPermissions,
        }));
    }

    /**
     * Return permissions of role and account, passed by parameter
     *
     * @param roleId
     * @param account
     * @param newPermissions
     * @param overwriteRolePermissions
     * @returns
     */
    static updateAccountPermissions(
        roleId: string,
        account: IamAccountResponse,
        newPermissions: SeederPermission[],
        overwriteRolePermissions = false,
    ): AccountPermissions
    {
        if (overwriteRolePermissions || !Array.isArray(account.dPermissions[roleId]))
        {
            // set new permissions from current role for each account
            account.dPermissions[roleId] = newPermissions.map(permission => permission.name);
        }
        else
        {
            for (const permission of newPermissions)
            {
                if (account.dPermissions[roleId].indexOf(permission.name) === -1)  account.dPermissions[roleId].push(permission.name);
            }
        }

        // container for all permissions
        const allPermissions = [];

        // iterate each role from account
        for (const index in account.dPermissions)
        {
            // avoid iterate all index, is the key that contain all permissions
            if (index !== 'all')
            {
                for (const permission of account.dPermissions[index])
                {
                    if (allPermissions.indexOf(permission) === -1) allPermissions.push(permission);
                }
            }
        }
        // set all permissions
        account.dPermissions['all'] = allPermissions;

        return account.dPermissions;
    }
}