import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedTenantAccountEvent {
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
