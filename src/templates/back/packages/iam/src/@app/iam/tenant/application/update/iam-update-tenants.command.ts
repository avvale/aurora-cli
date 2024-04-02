import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateTenantsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            parentId?: string;
            name?: string;
            code?: string;
            logo?: any;
            isActive?: boolean;
            meta?: any;
            accountIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
