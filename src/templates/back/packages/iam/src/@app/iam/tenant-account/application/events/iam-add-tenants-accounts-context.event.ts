import {
  IamCreatedTenantAccountEvent,
  IamCreatedTenantsAccountsEvent,
  IamDeletedTenantAccountEvent,
  IamDeletedTenantsAccountsEvent,
  IamTenantAccount,
  IamUpdatedTenantAccountEvent,
  IamUpdatedTenantsAccountsEvent,
} from '@app/iam/tenant-account';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddTenantsAccountsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: IamTenantAccount[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new IamCreatedTenantsAccountsEvent({
        payload: this.aggregateRoots.map(
          (tenantAccount) =>
            new IamCreatedTenantAccountEvent({
              payload: {
                tenantId: tenantAccount.tenantId.value,
                accountId: tenantAccount.accountId.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new IamUpdatedTenantsAccountsEvent({
        payload: this.aggregateRoots.map(
          (tenantAccount) =>
            new IamUpdatedTenantAccountEvent({
              payload: {
                tenantId: tenantAccount.tenantId.value,
                accountId: tenantAccount.accountId.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new IamDeletedTenantsAccountsEvent({
        payload: this.aggregateRoots.map(
          (tenantAccount) =>
            new IamDeletedTenantAccountEvent({
              payload: {
                tenantId: tenantAccount.tenantId.value,
                accountId: tenantAccount.accountId.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
