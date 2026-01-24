/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { IamRole } from '@app/iam/role';
import {
  IamCreatedRoleAccountEvent,
  IamDeletedRoleAccountEvent,
  IamUpdatedRoleAccountEvent,
} from '@app/iam/role-account';
import {
  IamRoleAccountAccountId,
  IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamRoleAccount extends AggregateRoot {
  roleId: IamRoleAccountRoleId;
  accountId: IamRoleAccountAccountId;
  role: IamRole;
  account: IamAccount;

  constructor(
    roleId: IamRoleAccountRoleId,
    accountId: IamRoleAccountAccountId,
    role?: IamRole,
    account?: IamAccount,
  ) {
    super();
    this.roleId = roleId;
    this.accountId = accountId;
    this.role = role;
    this.account = account;
  }

  static register(
    roleId: IamRoleAccountRoleId,
    accountId: IamRoleAccountAccountId,
    role?: IamRole,
    account?: IamAccount,
  ): IamRoleAccount {
    return new IamRoleAccount(roleId, accountId, role, account);
  }

  created(event: { payload: IamRoleAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamCreatedRoleAccountEvent({
        payload: {
          roleId: event.payload.roleId.value,
          accountId: event.payload.accountId.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: IamRoleAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamUpdatedRoleAccountEvent({
        payload: {
          roleId: event.payload.roleId?.value,
          accountId: event.payload.accountId?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: IamRoleAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamDeletedRoleAccountEvent({
        payload: {
          roleId: event.payload.roleId.value,
          accountId: event.payload.accountId.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      roleId: this.roleId.value,
      accountId: this.accountId.value,
      role: this.role?.toDTO(),
      account: this.account?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      roleId: this.roleId.value,
      accountId: this.accountId.value,
      role: this.role?.toDTO(),
      account: this.account?.toDTO(),
    };
  }
}
