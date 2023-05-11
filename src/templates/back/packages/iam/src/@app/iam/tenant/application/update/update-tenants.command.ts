import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateTenantsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            code?: string;
            logo?: string;
            isActive?: boolean;
            meta?: any;
            accountIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}