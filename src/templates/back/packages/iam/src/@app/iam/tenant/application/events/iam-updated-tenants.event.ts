import { IamUpdatedTenantEvent } from '@app/iam/tenant';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedTenantsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedTenantEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
