import { IamPermissionResponse } from '@app/iam/permission';
import { IamRoleResponse } from '@app/iam/role';

export class IamPermissionRoleResponse
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
        public readonly permission: IamPermissionResponse,
        public readonly role: IamRoleResponse,
    ) {}
}