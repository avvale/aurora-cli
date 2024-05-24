import { IamUpdatedAndIncrementedTenantAccountEvent } from '@app/iam/tenant-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedTenantsAccountsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedTenantAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
