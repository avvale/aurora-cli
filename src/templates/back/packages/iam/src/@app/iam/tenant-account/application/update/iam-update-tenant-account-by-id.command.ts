import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateTenantAccountByIdCommand
{
    constructor(
        public readonly payload: {
            tenantId: string;
            accountId: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
