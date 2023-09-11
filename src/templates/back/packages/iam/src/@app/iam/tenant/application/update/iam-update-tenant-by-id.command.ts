import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateTenantByIdCommand
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
