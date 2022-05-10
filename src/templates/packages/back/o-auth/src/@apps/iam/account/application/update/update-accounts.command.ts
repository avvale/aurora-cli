import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateAccountsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            type?: string;
            email?: string;
            isActive?: boolean;
            clientId?: string;
            dApplicationCodes?: any;
            dPermissions?: any;
            dTenants?: any;
            dScopes?: any;
            data?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}