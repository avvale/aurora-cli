import { CQMetadata } from '@aurora-ts/core';

export class UpsertTenantCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            code?: string;
            logo?: string;
            isActive?: boolean;
            meta?: any;
            accountIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}