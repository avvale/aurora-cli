import { Injectable } from '@nestjs/common';

// @app
import { RoleResponse } from '@app/iam/role/domain/role.response';
import { AccountPermissions } from '@app/iam/iam.types';

@Injectable()
export class IamCreatePermissionsFromRolesService
{
    main(roles: RoleResponse[]): AccountPermissions
    {
        // create permission for new account
        const accountPermissions: AccountPermissions = { all: []};
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
}