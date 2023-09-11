import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateAccountsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
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
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
