import { IamUpdatedRoleAccountEvent } from '@app/iam/role-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedRolesAccountsEvent {
  constructor(
    public readonly event: {
      payload: IamUpdatedRoleAccountEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
