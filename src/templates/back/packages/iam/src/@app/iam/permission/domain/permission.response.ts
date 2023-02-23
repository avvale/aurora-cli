import { BoundedContextResponse } from '@app/iam/bounded-context/domain/bounded-context.response';
import { RoleResponse } from '@app/iam/role/domain/role.response';

export class PermissionResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly boundedContextId: string,
        public readonly roleIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly boundedContext: BoundedContextResponse,
        public readonly roles: RoleResponse[],
    ) {}
}