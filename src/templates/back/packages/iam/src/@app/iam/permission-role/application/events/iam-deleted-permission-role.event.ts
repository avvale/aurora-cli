export class IamDeletedPermissionRoleEvent
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
    ) {}
}
