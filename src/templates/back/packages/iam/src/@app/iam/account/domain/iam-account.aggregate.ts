/* eslint-disable key-spacing */
import {
  IamCreatedAccountEvent,
  IamDeletedAccountEvent,
  IamUpdatedAccountEvent,
} from '@app/iam/account';
import {
  IamAccountClientId,
  IamAccountCode,
  IamAccountCreatedAt,
  IamAccountDApplicationCodes,
  IamAccountDeletedAt,
  IamAccountDPermissions,
  IamAccountDTenants,
  IamAccountEmail,
  IamAccountId,
  IamAccountIsActive,
  IamAccountMeta,
  IamAccountRoleIds,
  IamAccountRowId,
  IamAccountScopes,
  IamAccountTags,
  IamAccountTenantIds,
  IamAccountType,
  IamAccountUpdatedAt,
  IamAccountUsername,
} from '@app/iam/account/domain/value-objects';
import { IamRole } from '@app/iam/role';
import { IamTenant } from '@app/iam/tenant';
import { IamUser } from '@app/iam/user';
import { OAuthClient } from '@app/o-auth/client';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAccount extends AggregateRoot {
  id: IamAccountId;
  rowId: IamAccountRowId;
  type: IamAccountType;
  code: IamAccountCode;
  email: IamAccountEmail;
  username: IamAccountUsername;
  isActive: IamAccountIsActive;
  clientId: IamAccountClientId;
  tags: IamAccountTags;
  scopes: IamAccountScopes;
  dApplicationCodes: IamAccountDApplicationCodes;
  dPermissions: IamAccountDPermissions;
  dTenants: IamAccountDTenants;
  meta: IamAccountMeta;
  roleIds: IamAccountRoleIds;
  tenantIds: IamAccountTenantIds;
  createdAt: IamAccountCreatedAt;
  updatedAt: IamAccountUpdatedAt;
  deletedAt: IamAccountDeletedAt;
  user: IamUser;
  client: OAuthClient;
  roles: IamRole[];
  tenants: IamTenant[];

  constructor(
    id: IamAccountId,
    rowId: IamAccountRowId,
    type: IamAccountType,
    code: IamAccountCode,
    email: IamAccountEmail,
    username: IamAccountUsername,
    isActive: IamAccountIsActive,
    clientId: IamAccountClientId,
    tags: IamAccountTags,
    scopes: IamAccountScopes,
    dApplicationCodes: IamAccountDApplicationCodes,
    dPermissions: IamAccountDPermissions,
    dTenants: IamAccountDTenants,
    meta: IamAccountMeta,
    roleIds: IamAccountRoleIds,
    tenantIds: IamAccountTenantIds,
    createdAt: IamAccountCreatedAt,
    updatedAt: IamAccountUpdatedAt,
    deletedAt: IamAccountDeletedAt,
    user?: IamUser,
    client?: OAuthClient,
    roles?: IamRole[],
    tenants?: IamTenant[],
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.type = type;
    this.code = code;
    this.email = email;
    this.username = username;
    this.isActive = isActive;
    this.clientId = clientId;
    this.tags = tags;
    this.scopes = scopes;
    this.dApplicationCodes = dApplicationCodes;
    this.dPermissions = dPermissions;
    this.dTenants = dTenants;
    this.meta = meta;
    this.roleIds = roleIds;
    this.tenantIds = tenantIds;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.user = user;
    this.client = client;
    this.roles = roles;
    this.tenants = tenants;
  }

  static register(
    id: IamAccountId,
    rowId: IamAccountRowId,
    type: IamAccountType,
    code: IamAccountCode,
    email: IamAccountEmail,
    username: IamAccountUsername,
    isActive: IamAccountIsActive,
    clientId: IamAccountClientId,
    tags: IamAccountTags,
    scopes: IamAccountScopes,
    dApplicationCodes: IamAccountDApplicationCodes,
    dPermissions: IamAccountDPermissions,
    dTenants: IamAccountDTenants,
    meta: IamAccountMeta,
    roleIds: IamAccountRoleIds,
    tenantIds: IamAccountTenantIds,
    createdAt: IamAccountCreatedAt,
    updatedAt: IamAccountUpdatedAt,
    deletedAt: IamAccountDeletedAt,
    user?: IamUser,
    client?: OAuthClient,
    roles?: IamRole[],
    tenants?: IamTenant[],
  ): IamAccount {
    return new IamAccount(
      id,
      rowId,
      type,
      code,
      email,
      username,
      isActive,
      clientId,
      tags,
      scopes,
      dApplicationCodes,
      dPermissions,
      dTenants,
      meta,
      roleIds,
      tenantIds,
      createdAt,
      updatedAt,
      deletedAt,
      user,
      client,
      roles,
      tenants,
    );
  }

  created(event: { payload: IamAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamCreatedAccountEvent({
        payload: {
          id: event.payload.id.value,
          type: event.payload.type.value,
          code: event.payload.code?.value,
          email: event.payload.email?.value,
          username: event.payload.username.value,
          isActive: event.payload.isActive.value,
          clientId: event.payload.clientId.value,
          tags: event.payload.tags?.value,
          scopes: event.payload.scopes?.value,
          dApplicationCodes: event.payload.dApplicationCodes.value,
          dPermissions: event.payload.dPermissions.value,
          dTenants: event.payload.dTenants.value,
          meta: event.payload.meta?.value,
          roleIds: event.payload.roleIds?.value,
          tenantIds: event.payload.tenantIds?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: IamAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamUpdatedAccountEvent({
        payload: {
          id: event.payload.id?.value,
          type: event.payload.type?.value,
          code: event.payload.code?.value,
          email: event.payload.email?.value,
          username: event.payload.username?.value,
          isActive: event.payload.isActive?.value,
          clientId: event.payload.clientId?.value,
          tags: event.payload.tags?.value,
          scopes: event.payload.scopes?.value,
          dApplicationCodes: event.payload.dApplicationCodes?.value,
          dPermissions: event.payload.dPermissions?.value,
          dTenants: event.payload.dTenants?.value,
          meta: event.payload.meta?.value,
          roleIds: event.payload.roleIds?.value,
          tenantIds: event.payload.tenantIds?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: IamAccount; cQMetadata?: CQMetadata }): void {
    this.apply(
      new IamDeletedAccountEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          type: event.payload.type.value,
          code: event.payload.code?.value,
          email: event.payload.email?.value,
          username: event.payload.username.value,
          isActive: event.payload.isActive.value,
          clientId: event.payload.clientId.value,
          tags: event.payload.tags?.value,
          scopes: event.payload.scopes?.value,
          dApplicationCodes: event.payload.dApplicationCodes.value,
          dPermissions: event.payload.dPermissions.value,
          dTenants: event.payload.dTenants.value,
          meta: event.payload.meta?.value,
          roleIds: event.payload.roleIds?.value,
          tenantIds: event.payload.tenantIds?.value,
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
      type: this.type.value,
      code: this.code?.value,
      email: this.email?.value,
      username: this.username.value,
      isActive: this.isActive.value,
      clientId: this.clientId.value,
      tags: this.tags?.value,
      scopes: this.scopes?.value,
      dApplicationCodes: this.dApplicationCodes.value,
      dPermissions: this.dPermissions.value,
      dTenants: this.dTenants.value,
      meta: this.meta?.value,
      roleIds: this.roleIds?.value,
      tenantIds: this.tenantIds?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      user: this.user?.toDTO(),
      client: this.client?.toDTO(),
      roles: this.roles?.map((item) => item.toDTO()),
      tenants: this.tenants?.map((item) => item.toDTO()),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      type: this.type.value,
      code: this.code?.value,
      email: this.email?.value,
      username: this.username.value,
      isActive: this.isActive.value,
      clientId: this.clientId.value,
      tags: this.tags?.value,
      scopes: this.scopes?.value,
      dApplicationCodes: this.dApplicationCodes.value,
      dPermissions: this.dPermissions.value,
      dTenants: this.dTenants.value,
      meta: this.meta?.value,
      roleIds: this.roleIds?.value,
      tenantIds: this.tenantIds?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      user: this.user?.toDTO(),
      client: this.client?.toDTO(),
      roles: this.roles?.map((item) => item.toDTO()),
      tenants: this.tenants?.map((item) => item.toDTO()),
    };
  }
}
