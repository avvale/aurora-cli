import { IamDeletedTenantAccountEvent } from '@app/iam/tenant-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedTenantsAccountsEvent
{
    constructor(
        public readonly event: {
            payload: IamDeletedTenantAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
