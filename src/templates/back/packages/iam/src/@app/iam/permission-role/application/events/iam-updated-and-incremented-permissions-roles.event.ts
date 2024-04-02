import { IamUpdatedAndIncrementedPermissionRoleEvent } from './iam-updated-and-incremented-permission-role.event';

export class IamUpdatedAndIncrementedPermissionsRolesEvent
{
    constructor(
        public readonly permissionsRoles: IamUpdatedAndIncrementedPermissionRoleEvent[],
    ) {}
}
