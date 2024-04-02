import { IamRoleResponse } from '@app/iam/role';
import { IamTenantResponse } from '@app/iam/tenant';
import { IamUserResponse } from '@app/iam/user';
import { OAuthClientResponse } from '@app/o-auth/client';

export class IamAccountResponse
{
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly code: string,
        public readonly email: string,
        public readonly isActive: boolean,
        public readonly clientId: string,
        public readonly tags: string[],
        public readonly scopes: string[],
        public readonly dApplicationCodes: string[],
        public readonly dPermissions: any,
        public readonly dTenants: string[],
        public readonly meta: any,
        public readonly roleIds: string[],
        public readonly tenantIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly user: IamUserResponse,
        public readonly client: OAuthClientResponse,
        public readonly roles: IamRoleResponse[],
        public readonly tenants: IamTenantResponse[],
    ) {}
}
