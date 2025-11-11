import { IamBoundedContextResponse } from '@app/iam/bounded-context';
import { IamRoleResponse } from '@app/iam/role';

export class IamPermissionResponse {
    constructor(
        public readonly id: string,
        public readonly rowId: number,
        public readonly name: string,
        public readonly boundedContextId: string,
        public readonly roleIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly boundedContext: IamBoundedContextResponse,
        public readonly roles: IamRoleResponse[],
    ) {}
}
