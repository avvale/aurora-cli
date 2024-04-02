import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateAccountCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type: string;
            code?: string;
            email: string;
            isActive: boolean;
            clientId: string;
            tags?: string[];
            scopes?: string[];
            dApplicationCodes: string[];
            dPermissions: any;
            meta?: any;
            roleIds?: string[];
            tenantIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
