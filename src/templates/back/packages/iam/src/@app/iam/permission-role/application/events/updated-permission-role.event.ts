export class UpdatedPermissionRoleEvent
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
    ) {}
}