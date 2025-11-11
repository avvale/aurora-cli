import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateTenantAccountCommand {
    constructor(
        public readonly payload: {
            tenantId: string;
            accountId: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
