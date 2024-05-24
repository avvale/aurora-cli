import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedTenantAccountEvent
{
    constructor(
        public readonly event: {
            payload: {
                tenantId: string;
                accountId: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
