import { IamDeletedTenantEvent } from '@app/iam/tenant';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedTenantsEvent {
    constructor(
        public readonly event: {
            payload: IamDeletedTenantEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
