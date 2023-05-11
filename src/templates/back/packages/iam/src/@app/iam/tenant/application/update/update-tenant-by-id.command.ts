import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

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