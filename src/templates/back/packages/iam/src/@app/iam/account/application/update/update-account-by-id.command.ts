import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateAccountByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type?: string;
            code?: string;
            email?: string;
            isActive?: boolean;
            clientId?: string;
            scopes?: any;
            dApplicationCodes?: any;
            dPermissions?: any;
            dTenants?: any;
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}