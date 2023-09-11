import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateTenantsAccountsCommand
{
    constructor(
        public readonly payload: {
            tenantId?: string;
            accountId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
