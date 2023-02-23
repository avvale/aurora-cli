import { CQMetadata } from '@aurora-ts/core';

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
            scopes?: any;
            dApplicationCodes: any;
            dPermissions: any;
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}