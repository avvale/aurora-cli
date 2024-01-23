import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateAccountByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type?: string;
            code?: string;
            email?: string;
            isActive?: boolean;
            clientId?: string;
            scopes?: string[];
            dApplicationCodes?: string[];
            dPermissions?: any;
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
