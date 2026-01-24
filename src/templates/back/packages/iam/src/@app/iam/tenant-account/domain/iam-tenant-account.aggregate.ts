/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { IamTenant } from '@app/iam/tenant';
import {
  IamCreatedTenantAccountEvent,
  IamDeletedTenantAccountEvent,
  IamUpdatedTenantAccountEvent,
} from '@app/iam/tenant-account';
import {
  IamTenantAccountAccountId,
  IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamTenantAccount extends AggregateRoot {
  tenantId: IamTenantAccountTenantId;
  accountId: IamTenantAccountAccountId;
  tenant: IamTenant;
  account: IamAccount;

  constructor(
    tenantId: IamTenantAccountTenantId,
    accountId: IamTenantAccountAccountId,
    tenant?: IamTenant,
    account?: IamAccount,
  ) {
    super();
    this.tenantId = tenantId;
    this.accountId = accountId;
    this.tenant = tenant;
    this.account = account;
  }

  static register(
    tenantId: IamTenantAccountTenantId,
    accountId: IamTenantAccountAccountId,
    tenant?: IamTenant,
    account?: IamAccount,
  ): IamTenantAccount {
    return new IamTenantAccount(tenantId, accountId, tenant, account);
  }

  created(event: { payload: IamTenantAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamCreatedTenantAccountEvent({
        payload: {
          tenantId: event.payload.tenantId.value,
          accountId: event.payload.accountId.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: IamTenantAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamUpdatedTenantAccountEvent({
        payload: {
          tenantId: event.payload.tenantId?.value,
          accountId: event.payload.accountId?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: IamTenantAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamDeletedTenantAccountEvent({
        payload: {
          tenantId: event.payload.tenantId.value,
          accountId: event.payload.accountId.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      tenantId: this.tenantId.value,
      accountId: this.accountId.value,
      tenant: this.tenant?.toDTO(),
      account: this.account?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      tenantId: this.tenantId.value,
      accountId: this.accountId.value,
      tenant: this.tenant?.toDTO(),
      account: this.account?.toDTO(),
    };
  }
}
