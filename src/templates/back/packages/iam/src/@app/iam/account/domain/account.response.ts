import { UserResponse } from '@app/iam/user/domain/user.response';
import { ClientResponse } from '@app/o-auth/client/domain/client.response';
import { RoleResponse } from '@app/iam/role/domain/role.response';
import { TenantResponse } from '@app/iam/tenant/domain/tenant.response';

export class AccountResponse
{
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly code: string,
        public readonly email: string,
        public readonly isActive: boolean,
        public readonly clientId: string,
        public readonly scopes: any,
        public readonly dApplicationCodes: any,
        public readonly dPermissions: any,
        public readonly dTenants: any,
        public readonly meta: any,
        public readonly roleIds: string[],
        public readonly tenantIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly user: UserResponse,
        public readonly client: ClientResponse,
        public readonly roles: RoleResponse[],
        public readonly tenants: TenantResponse[],
    ) {}
}