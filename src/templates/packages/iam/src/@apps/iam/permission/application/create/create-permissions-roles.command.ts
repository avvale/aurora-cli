export class CreatePermissionsRolesCommand
{
    constructor(
        public readonly permissionsRoles: {
            permissionId: string;
            roleId: string;
        } [],
    ) {}
}