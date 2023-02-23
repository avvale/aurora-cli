export class DeletedPermissionRoleEvent
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
    ) {}
}