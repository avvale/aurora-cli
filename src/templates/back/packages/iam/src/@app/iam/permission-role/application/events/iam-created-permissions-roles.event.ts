import { IamCreatedPermissionRoleEvent } from './iam-created-permission-role.event';

export class IamCreatedPermissionsRolesEvent
{
    constructor(
        public readonly permissionsRoles: IamCreatedPermissionRoleEvent[],
    ) {}
}
