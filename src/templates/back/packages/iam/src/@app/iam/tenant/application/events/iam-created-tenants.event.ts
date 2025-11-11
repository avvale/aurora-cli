import { IamCreatedTenantEvent } from '@app/iam/tenant';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedTenantsEvent {
    constructor(
        public readonly event: {
            payload: IamCreatedTenantEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
