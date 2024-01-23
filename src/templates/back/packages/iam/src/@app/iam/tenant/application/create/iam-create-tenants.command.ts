import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateTenantsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            parentId?: string;
            name: string;
            code?: string;
            logo?: string;
            isActive: boolean;
            meta?: any;
            accountIds?: string[];
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
