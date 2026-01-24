import { IamCreatedTenantAccountEvent } from '@app/iam/tenant-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedTenantsAccountsEvent {
  constructor(
    public readonly event: {
      payload: IamCreatedTenantAccountEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
