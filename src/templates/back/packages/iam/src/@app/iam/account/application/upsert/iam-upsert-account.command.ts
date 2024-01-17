import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpsertAccountCommand
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
            dTenants?: string[];
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
