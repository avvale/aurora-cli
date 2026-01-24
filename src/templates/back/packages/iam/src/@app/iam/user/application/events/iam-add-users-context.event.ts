import {
  IamCreatedUserEvent,
  IamCreatedUsersEvent,
  IamDeletedUserEvent,
  IamDeletedUsersEvent,
  IamUpdatedUserEvent,
  IamUpdatedUsersEvent,
  IamUser,
} from '@app/iam/user';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddUsersContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: IamUser[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new IamCreatedUsersEvent({
        payload: this.aggregateRoots.map(
          (user) =>
            new IamCreatedUserEvent({
              payload: {
                id: user.id.value,
                accountId: user.accountId.value,
                name: user.name.value,
                surname: user.surname?.value,
                avatar: user.avatar?.value,
                mobile: user.mobile?.value,
                langId: user.langId?.value,
                password: user.password.value,
                isTwoFactorAuthenticationEnabled:
                  user.isTwoFactorAuthenticationEnabled.value,
                twoFactorAuthenticationSecret:
                  user.twoFactorAuthenticationSecret?.value,
                rememberToken: user.rememberToken?.value,
                meta: user.meta?.value,
                createdAt: user.createdAt?.value,
                updatedAt: user.updatedAt?.value,
                deletedAt: user.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new IamUpdatedUsersEvent({
        payload: this.aggregateRoots.map(
          (user) =>
            new IamUpdatedUserEvent({
              payload: {
                id: user.id.value,
                accountId: user.accountId.value,
                name: user.name.value,
                surname: user.surname?.value,
                avatar: user.avatar?.value,
                mobile: user.mobile?.value,
                langId: user.langId?.value,
                password: user.password.value,
                isTwoFactorAuthenticationEnabled:
                  user.isTwoFactorAuthenticationEnabled.value,
                twoFactorAuthenticationSecret:
                  user.twoFactorAuthenticationSecret?.value,
                rememberToken: user.rememberToken?.value,
                meta: user.meta?.value,
                createdAt: user.createdAt?.value,
                updatedAt: user.updatedAt?.value,
                deletedAt: user.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new IamDeletedUsersEvent({
        payload: this.aggregateRoots.map(
          (user) =>
            new IamDeletedUserEvent({
              payload: {
                id: user.id.value,
                rowId: user.rowId.value,
                accountId: user.accountId.value,
                name: user.name.value,
                surname: user.surname?.value,
                avatar: user.avatar?.value,
                mobile: user.mobile?.value,
                langId: user.langId?.value,
                password: user.password.value,
                isTwoFactorAuthenticationEnabled:
                  user.isTwoFactorAuthenticationEnabled.value,
                twoFactorAuthenticationSecret:
                  user.twoFactorAuthenticationSecret?.value,
                rememberToken: user.rememberToken?.value,
                meta: user.meta?.value,
                createdAt: user.createdAt?.value,
                updatedAt: user.updatedAt?.value,
                deletedAt: user.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
