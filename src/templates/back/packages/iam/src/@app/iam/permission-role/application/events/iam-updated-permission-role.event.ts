export class IamUpdatedPermissionRoleEvent
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
    ) {}
}
