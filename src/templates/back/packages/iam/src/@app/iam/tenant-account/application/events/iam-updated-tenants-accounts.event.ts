import { IamUpdatedTenantAccountEvent } from '@app/iam/tenant-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedTenantsAccountsEvent {
    constructor(
        public readonly event: {
            payload: IamUpdatedTenantAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
