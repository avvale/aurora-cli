import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedTenantEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                parentId: string;
                name: string;
                code: string;
                logo: any;
                isActive: boolean;
                meta: any;
                accountIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
