import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateTenantCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            code?: string;
            logo?: string;
            isActive?: boolean;
            data?: any;
            accountIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}