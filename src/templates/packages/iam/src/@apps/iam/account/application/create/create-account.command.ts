import { CQMetadata } from 'aurora-ts-core';

export class CreateAccountCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type: string;
            email: string;
            isActive: boolean;
            clientId: string;
            dApplicationCodes: any;
            dPermissions: any;
            data: any,
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}