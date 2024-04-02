import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateAndIncrementAccountsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            type?: string;
            code?: string;
            email?: string;
            isActive?: boolean;
            clientId?: string;
            tags?: string[];
            scopes?: string[];
            dApplicationCodes?: string[];
            dPermissions?: any;
            dTenants?: string[];
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
