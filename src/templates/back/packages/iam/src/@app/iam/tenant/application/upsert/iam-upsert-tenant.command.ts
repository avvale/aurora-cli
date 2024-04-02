import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpsertTenantCommand
{
    constructor(
        public readonly payload: {
            id: string;
            parentId?: string;
            name?: string;
            code?: string;
            logo?: any;
            isActive?: boolean;
            meta?: any;
            accountIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
