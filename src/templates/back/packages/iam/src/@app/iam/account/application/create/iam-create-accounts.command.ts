import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateAccountsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type: string;
            code?: string;
            email: string;
            isActive: boolean;
            clientId: string;
            scopes?: any;
            dApplicationCodes: any;
            dPermissions: any;
            dTenants: any;
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
