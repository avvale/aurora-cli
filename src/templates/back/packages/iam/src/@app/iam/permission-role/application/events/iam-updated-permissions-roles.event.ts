import { IamUpdatedPermissionRoleEvent } from './iam-updated-permission-role.event';

export class IamUpdatedPermissionsRolesEvent
{
    constructor(
        public readonly permissionsRoles: IamUpdatedPermissionRoleEvent[],
    ) {}
}
