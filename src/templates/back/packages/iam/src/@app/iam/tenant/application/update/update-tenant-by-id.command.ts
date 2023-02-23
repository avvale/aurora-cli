import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateTenantByIdCommand
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
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}