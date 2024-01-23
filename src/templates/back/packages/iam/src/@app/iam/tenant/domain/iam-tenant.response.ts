import { IamAccountResponse } from '@app/iam/account';

export class IamTenantResponse
{
    constructor(
        public readonly id: string,
        public readonly parentId: string,
        public readonly name: string,
        public readonly code: string,
        public readonly logo: string,
        public readonly isActive: boolean,
        public readonly meta: any,
        public readonly accountIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly parent: IamTenantResponse,
        public readonly accounts: IamAccountResponse[],
    ) {}
}
