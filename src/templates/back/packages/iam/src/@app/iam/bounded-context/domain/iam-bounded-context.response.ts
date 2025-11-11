import { IamPermissionResponse } from '@app/iam/permission';

export class IamBoundedContextResponse {
    constructor(
        public readonly id: string,
        public readonly rowId: number,
        public readonly name: string,
        public readonly root: string,
        public readonly sort: number,
        public readonly isActive: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly permissions: IamPermissionResponse[],
    ) {}
}
