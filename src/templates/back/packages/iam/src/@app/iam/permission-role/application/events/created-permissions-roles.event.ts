import { CreatedPermissionRoleEvent } from './created-permission-role.event';

export class CreatedPermissionsRolesEvent
{
    constructor(
        public readonly permissionsRoles: CreatedPermissionRoleEvent[],
    ) {}
}