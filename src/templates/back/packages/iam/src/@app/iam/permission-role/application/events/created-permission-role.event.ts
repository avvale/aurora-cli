export class CreatedPermissionRoleEvent
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
    ) {}
}