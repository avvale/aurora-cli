import { IamAccountResponse } from '@app/iam/account';
import { IamPermissionResponse } from '@app/iam/permission';

export class IamRoleResponse {
    constructor(
        public readonly id: string,
        public readonly rowId: number,
        public readonly name: string,
        public readonly isMaster: boolean,
        public readonly permissionIds: string[],
        public readonly accountIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly permissions: IamPermissionResponse[],
        public readonly accounts: IamAccountResponse[],
    ) {}
}
