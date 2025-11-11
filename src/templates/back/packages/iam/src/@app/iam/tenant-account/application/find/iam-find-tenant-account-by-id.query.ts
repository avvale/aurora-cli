import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamFindTenantAccountByIdQuery {
    constructor(
        public readonly tenantId: string,
        public readonly accountId: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
