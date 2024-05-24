import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedTenantAccountEvent
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
