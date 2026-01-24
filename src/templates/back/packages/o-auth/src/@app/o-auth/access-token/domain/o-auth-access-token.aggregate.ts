/* eslint-disable key-spacing */
import {
  OAuthCreatedAccessTokenEvent,
  OAuthDeletedAccessTokenEvent,
} from '@app/o-auth/access-token';
import {
  OAuthAccessTokenAccountId,
  OAuthAccessTokenClientId,
  OAuthAccessTokenCreatedAt,
  OAuthAccessTokenDeletedAt,
  OAuthAccessTokenExpiresAt,
  OAuthAccessTokenId,
  OAuthAccessTokenIsRevoked,
  OAuthAccessTokenName,
  OAuthAccessTokenRowId,
  OAuthAccessTokenToken,
  OAuthAccessTokenUpdatedAt,
} from '@app/o-auth/access-token/domain/value-objects';
import { OAuthClient } from '@app/o-auth/client';
import { OAuthRefreshToken } from '@app/o-auth/refresh-token';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAccessToken extends AggregateRoot {
  id: OAuthAccessTokenId;
  rowId: OAuthAccessTokenRowId;
  clientId: OAuthAccessTokenClientId;
  accountId: OAuthAccessTokenAccountId;
  token: OAuthAccessTokenToken;
  name: OAuthAccessTokenName;
  isRevoked: OAuthAccessTokenIsRevoked;
  expiresAt: OAuthAccessTokenExpiresAt;
  createdAt: OAuthAccessTokenCreatedAt;
  updatedAt: OAuthAccessTokenUpdatedAt;
  deletedAt: OAuthAccessTokenDeletedAt;
  refreshToken: OAuthRefreshToken;
  client: OAuthClient;

  constructor(
    id: OAuthAccessTokenId,
    rowId: OAuthAccessTokenRowId,
    clientId: OAuthAccessTokenClientId,
    accountId: OAuthAccessTokenAccountId,
    token: OAuthAccessTokenToken,
    name: OAuthAccessTokenName,
    isRevoked: OAuthAccessTokenIsRevoked,
    expiresAt: OAuthAccessTokenExpiresAt,
    createdAt: OAuthAccessTokenCreatedAt,
    updatedAt: OAuthAccessTokenUpdatedAt,
    deletedAt: OAuthAccessTokenDeletedAt,
    refreshToken?: OAuthRefreshToken,
    client?: OAuthClient,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.clientId = clientId;
    this.accountId = accountId;
    this.token = token;
    this.name = name;
    this.isRevoked = isRevoked;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.refreshToken = refreshToken;
    this.client = client;
  }

  static register(
    id: OAuthAccessTokenId,
    rowId: OAuthAccessTokenRowId,
    clientId: OAuthAccessTokenClientId,
    accountId: OAuthAccessTokenAccountId,
    token: OAuthAccessTokenToken,
    name: OAuthAccessTokenName,
    isRevoked: OAuthAccessTokenIsRevoked,
    expiresAt: OAuthAccessTokenExpiresAt,
    createdAt: OAuthAccessTokenCreatedAt,
    updatedAt: OAuthAccessTokenUpdatedAt,
    deletedAt: OAuthAccessTokenDeletedAt,
    refreshToken?: OAuthRefreshToken,
    client?: OAuthClient,
  ): OAuthAccessToken {
    return new OAuthAccessToken(
      id,
      rowId,
      clientId,
      accountId,
      token,
      name,
      isRevoked,
      expiresAt,
      createdAt,
      updatedAt,
      deletedAt,
      refreshToken,
      client,
    );
  }

  created(event: { payload: OAuthAccessToken; cQMetadata?: CQMetadata }): void {
    this.apply(
      new OAuthCreatedAccessTokenEvent({
        payload: {
          id: event.payload.id.value,
          clientId: event.payload.clientId.value,
          accountId: event.payload.accountId?.value,
          token: event.payload.token.value,
          name: event.payload.name?.value,
          isRevoked: event.payload.isRevoked.value,
          expiresAt: event.payload.expiresAt?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: OAuthAccessToken; cQMetadata?: CQMetadata }): void {
    this.apply(
      new OAuthDeletedAccessTokenEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          clientId: event.payload.clientId.value,
          accountId: event.payload.accountId?.value,
          token: event.payload.token.value,
          name: event.payload.name?.value,
          isRevoked: event.payload.isRevoked.value,
          expiresAt: event.payload.expiresAt?.value,
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
      clientId: this.clientId.value,
      accountId: this.accountId?.value,
      token: this.token.value,
      name: this.name?.value,
      isRevoked: this.isRevoked.value,
      expiresAt: this.expiresAt?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      refreshToken: this.refreshToken?.toDTO(),
      client: this.client?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      clientId: this.clientId.value,
      accountId: this.accountId?.value,
      token: this.token.value,
      name: this.name?.value,
      isRevoked: this.isRevoked.value,
      expiresAt: this.expiresAt?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      refreshToken: this.refreshToken?.toDTO(),
      client: this.client?.toDTO(),
    };
  }
}
