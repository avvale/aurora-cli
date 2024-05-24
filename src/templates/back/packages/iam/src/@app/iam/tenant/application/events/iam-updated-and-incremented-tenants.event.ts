import { IamUpdatedAndIncrementedTenantEvent } from '@app/iam/tenant';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedTenantsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedTenantEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
