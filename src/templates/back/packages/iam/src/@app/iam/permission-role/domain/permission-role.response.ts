import { PermissionResponse } from '@app/iam/permission/domain/permission.response';
import { RoleResponse } from '@app/iam/role/domain/role.response';

export class PermissionRoleResponse
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
        public readonly permission: PermissionResponse,
        public readonly role: RoleResponse,
    ) {}
}