import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateTenantsAccountsCommand {
    constructor(
        public readonly payload: {
            tenantId: string;
            accountId: string;
        }[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
