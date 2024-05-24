import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedAccountEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                type: string;
                code: string;
                email: string;
                username: string;
                isActive: boolean;
                clientId: string;
                tags: string[];
                scopes: string[];
                dApplicationCodes: string[];
                dPermissions: any;
                dTenants: string[];
                meta: any;
                roleIds: string[];
                tenantIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
