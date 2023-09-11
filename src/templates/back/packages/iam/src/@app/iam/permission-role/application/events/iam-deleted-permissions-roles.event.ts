import { IamDeletedPermissionRoleEvent } from './iam-deleted-permission-role.event';

export class IamDeletedPermissionsRolesEvent
{
    constructor(
        public readonly permissionsRoles: IamDeletedPermissionRoleEvent[],
    ) {}
}
