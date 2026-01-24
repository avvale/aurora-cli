import { IamDeletedRoleAccountEvent } from '@app/iam/role-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedRolesAccountsEvent {
  constructor(
    public readonly event: {
      payload: IamDeletedRoleAccountEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
