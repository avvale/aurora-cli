import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateAccountCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type?: string;
            email?: string;
            isActive?: boolean;
            clientId?: string;
            dApplicationCodes?: any;
            dPermissions?: any;
            dTenants?: any;
            data?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}