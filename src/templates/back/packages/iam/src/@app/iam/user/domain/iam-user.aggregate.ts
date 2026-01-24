/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import {
  IamCreatedUserEvent,
  IamDeletedUserEvent,
  IamUpdatedUserEvent,
} from '@app/iam/user';
import {
  IamUserAccountId,
  IamUserAvatar,
  IamUserCreatedAt,
  IamUserDeletedAt,
  IamUserId,
  IamUserIsTwoFactorAuthenticationEnabled,
  IamUserLangId,
  IamUserMeta,
  IamUserMobile,
  IamUserName,
  IamUserPassword,
  IamUserRememberToken,
  IamUserRowId,
  IamUserSurname,
  IamUserTwoFactorAuthenticationSecret,
  IamUserUpdatedAt,
} from '@app/iam/user/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamUser extends AggregateRoot {
  id: IamUserId;
  rowId: IamUserRowId;
  accountId: IamUserAccountId;
  name: IamUserName;
  surname: IamUserSurname;
  avatar: IamUserAvatar;
  mobile: IamUserMobile;
  langId: IamUserLangId;
  password: IamUserPassword;
  isTwoFactorAuthenticationEnabled: IamUserIsTwoFactorAuthenticationEnabled;
  twoFactorAuthenticationSecret: IamUserTwoFactorAuthenticationSecret;
  rememberToken: IamUserRememberToken;
  meta: IamUserMeta;
  createdAt: IamUserCreatedAt;
  updatedAt: IamUserUpdatedAt;
  deletedAt: IamUserDeletedAt;
  account: IamAccount;

  constructor(
    id: IamUserId,
    rowId: IamUserRowId,
    accountId: IamUserAccountId,
    name: IamUserName,
    surname: IamUserSurname,
    avatar: IamUserAvatar,
    mobile: IamUserMobile,
    langId: IamUserLangId,
    password: IamUserPassword,
    isTwoFactorAuthenticationEnabled: IamUserIsTwoFactorAuthenticationEnabled,
    twoFactorAuthenticationSecret: IamUserTwoFactorAuthenticationSecret,
    rememberToken: IamUserRememberToken,
    meta: IamUserMeta,
    createdAt: IamUserCreatedAt,
    updatedAt: IamUserUpdatedAt,
    deletedAt: IamUserDeletedAt,
    account?: IamAccount,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.accountId = accountId;
    this.name = name;
    this.surname = surname;
    this.avatar = avatar;
    this.mobile = mobile;
    this.langId = langId;
    this.password = password;
    this.isTwoFactorAuthenticationEnabled = isTwoFactorAuthenticationEnabled;
    this.twoFactorAuthenticationSecret = twoFactorAuthenticationSecret;
    this.rememberToken = rememberToken;
    this.meta = meta;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.account = account;
  }

  static register(
    id: IamUserId,
    rowId: IamUserRowId,
    accountId: IamUserAccountId,
    name: IamUserName,
    surname: IamUserSurname,
    avatar: IamUserAvatar,
    mobile: IamUserMobile,
    langId: IamUserLangId,
    password: IamUserPassword,
    isTwoFactorAuthenticationEnabled: IamUserIsTwoFactorAuthenticationEnabled,
    twoFactorAuthenticationSecret: IamUserTwoFactorAuthenticationSecret,
    rememberToken: IamUserRememberToken,
    meta: IamUserMeta,
    createdAt: IamUserCreatedAt,
    updatedAt: IamUserUpdatedAt,
    deletedAt: IamUserDeletedAt,
    account?: IamAccount,
  ): IamUser {
    return new IamUser(
      id,
      rowId,
      accountId,
      name,
      surname,
      avatar,
      mobile,
      langId,
      password,
      isTwoFactorAuthenticationEnabled,
      twoFactorAuthenticationSecret,
      rememberToken,
      meta,
      createdAt,
      updatedAt,
      deletedAt,
      account,
    );
  }

  created(event: { payload: IamUser; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamCreatedUserEvent({
        payload: {
          id: event.payload.id.value,
          accountId: event.payload.accountId.value,
          name: event.payload.name.value,
          surname: event.payload.surname?.value,
          avatar: event.payload.avatar?.value,
          mobile: event.payload.mobile?.value,
          langId: event.payload.langId?.value,
          password: event.payload.password.value,
          isTwoFactorAuthenticationEnabled:
            event.payload.isTwoFactorAuthenticationEnabled.value,
          twoFactorAuthenticationSecret:
            event.payload.twoFactorAuthenticationSecret?.value,
          rememberToken: event.payload.rememberToken?.value,
          meta: event.payload.meta?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: IamUser; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamUpdatedUserEvent({
        payload: {
          id: event.payload.id?.value,
          accountId: event.payload.accountId?.value,
          name: event.payload.name?.value,
          surname: event.payload.surname?.value,
          avatar: event.payload.avatar?.value,
          mobile: event.payload.mobile?.value,
          langId: event.payload.langId?.value,
          password: event.payload.password?.value,
          isTwoFactorAuthenticationEnabled:
            event.payload.isTwoFactorAuthenticationEnabled?.value,
          twoFactorAuthenticationSecret:
            event.payload.twoFactorAuthenticationSecret?.value,
          rememberToken: event.payload.rememberToken?.value,
          meta: event.payload.meta?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: IamUser; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamDeletedUserEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          accountId: event.payload.accountId.value,
          name: event.payload.name.value,
          surname: event.payload.surname?.value,
          avatar: event.payload.avatar?.value,
          mobile: event.payload.mobile?.value,
          langId: event.payload.langId?.value,
          password: event.payload.password.value,
          isTwoFactorAuthenticationEnabled:
            event.payload.isTwoFactorAuthenticationEnabled.value,
          twoFactorAuthenticationSecret:
            event.payload.twoFactorAuthenticationSecret?.value,
          rememberToken: event.payload.rememberToken?.value,
          meta: event.payload.meta?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      rowId: this.rowId.value,
      accountId: this.accountId.value,
      name: this.name.value,
      surname: this.surname?.value,
      avatar: this.avatar?.value,
      mobile: this.mobile?.value,
      langId: this.langId?.value,
      password: this.password.value,
      isTwoFactorAuthenticationEnabled:
        this.isTwoFactorAuthenticationEnabled.value,
      twoFactorAuthenticationSecret: this.twoFactorAuthenticationSecret?.value,
      rememberToken: this.rememberToken?.value,
      meta: this.meta?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      account: this.account?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      accountId: this.accountId.value,
      name: this.name.value,
      surname: this.surname?.value,
      avatar: this.avatar?.value,
      mobile: this.mobile?.value,
      langId: this.langId?.value,
      password: this.password.value,
      isTwoFactorAuthenticationEnabled:
        this.isTwoFactorAuthenticationEnabled.value,
      twoFactorAuthenticationSecret: this.twoFactorAuthenticationSecret?.value,
      rememberToken: this.rememberToken?.value,
      meta: this.meta?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      account: this.account?.toDTO(),
    };
  }
}
