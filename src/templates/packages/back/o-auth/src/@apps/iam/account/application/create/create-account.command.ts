import { CQMetadata } from 'aurora-ts-core';

export class CreateAccountCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type: string;
            code?: string;
            email: string;
            isActive: boolean;
            clientId: string;
            dApplicationCodes: any;
            dPermissions: any;
            dScopes: any;
            data: any,
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}