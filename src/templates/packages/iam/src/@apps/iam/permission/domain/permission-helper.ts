import { ICommandBus, IQueryBus, SeederPermission } from 'aurora-ts-core';
import { CreatePermissionsCommand } from '../application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '../application/create/create-permissions-roles.command';
import { FindAccountByIdQuery } from '../../account/application/find/find-account-by-id.query';
import { AccountResponse } from '../../account/domain/account.response';
import { UpdateAccountCommand } from '../../account/application/update/update-account.command';
import { AccountPermissions } from '../../iam.types';

export class PermissionHelper
{
    static administratorAccountId   = '948a5308-a49d-42dc-9ea3-7490e120000b';
    static administratorRoleId      = '99b06044-fff5-4267-9314-4bae9f909010';

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
        const administratorAccount = await queryBus.ask(new FindAccountByIdQuery(PermissionHelper.administratorAccountId));

        // insert bounded contexts and permissions
        await commandBus.dispatch(new CreatePermissionsCommand(permissions));

        // set all permissions to administration role
        const permissionsRoles = permissions.map(permission =>
        {
            return {
                permissionId: permission.id,
                roleId      : PermissionHelper.administratorRoleId,
            };
        });
        await commandBus.dispatch(new CreatePermissionsRolesCommand(permissionsRoles));

        const accountPermissions = PermissionHelper.updateAccountPermissions(
            PermissionHelper.administratorRoleId,
            administratorAccount,
            permissions,
        );

        // set all permissions denormalized to administration account
        await commandBus.dispatch(new UpdateAccountCommand({
            id               : PermissionHelper.administratorAccountId,
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
        account: AccountResponse,
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