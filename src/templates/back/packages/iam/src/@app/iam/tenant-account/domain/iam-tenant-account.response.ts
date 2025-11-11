import { IamAccountResponse } from '@app/iam/account';
import { IamTenantResponse } from '@app/iam/tenant';

export class IamTenantAccountResponse {
    constructor(
        public readonly tenantId: string,
        public readonly accountId: string,
        public readonly tenant: IamTenantResponse,
        public readonly account: IamAccountResponse,
    ) {}
}
