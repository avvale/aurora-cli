/* eslint-disable key-spacing */
import { OAuthAccessToken } from '@app/o-auth/access-token';
import {
  OAuthCreatedRefreshTokenEvent,
  OAuthDeletedRefreshTokenEvent,
} from '@app/o-auth/refresh-token';
import {
  OAuthRefreshTokenAccessTokenId,
  OAuthRefreshTokenCreatedAt,
  OAuthRefreshTokenDeletedAt,
  OAuthRefreshTokenExpiresAt,
  OAuthRefreshTokenId,
  OAuthRefreshTokenIsRevoked,
  OAuthRefreshTokenRowId,
  OAuthRefreshTokenToken,
  OAuthRefreshTokenUpdatedAt,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthRefreshToken extends AggregateRoot {
  id: OAuthRefreshTokenId;
  rowId: OAuthRefreshTokenRowId;
  accessTokenId: OAuthRefreshTokenAccessTokenId;
  token: OAuthRefreshTokenToken;
  isRevoked: OAuthRefreshTokenIsRevoked;
  expiresAt: OAuthRefreshTokenExpiresAt;
  createdAt: OAuthRefreshTokenCreatedAt;
  updatedAt: OAuthRefreshTokenUpdatedAt;
  deletedAt: OAuthRefreshTokenDeletedAt;
  accessToken: OAuthAccessToken;

  constructor(
    id: OAuthRefreshTokenId,
    rowId: OAuthRefreshTokenRowId,
    accessTokenId: OAuthRefreshTokenAccessTokenId,
    token: OAuthRefreshTokenToken,
    isRevoked: OAuthRefreshTokenIsRevoked,
    expiresAt: OAuthRefreshTokenExpiresAt,
    createdAt: OAuthRefreshTokenCreatedAt,
    updatedAt: OAuthRefreshTokenUpdatedAt,
    deletedAt: OAuthRefreshTokenDeletedAt,
    accessToken?: OAuthAccessToken,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.accessTokenId = accessTokenId;
    this.token = token;
    this.isRevoked = isRevoked;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.accessToken = accessToken;
  }

  static register(
    id: OAuthRefreshTokenId,
    rowId: OAuthRefreshTokenRowId,
    accessTokenId: OAuthRefreshTokenAccessTokenId,
    token: OAuthRefreshTokenToken,
    isRevoked: OAuthRefreshTokenIsRevoked,
    expiresAt: OAuthRefreshTokenExpiresAt,
    createdAt: OAuthRefreshTokenCreatedAt,
    updatedAt: OAuthRefreshTokenUpdatedAt,
    deletedAt: OAuthRefreshTokenDeletedAt,
    accessToken?: OAuthAccessToken,
  ): OAuthRefreshToken {
    return new OAuthRefreshToken(
      id,
      rowId,
      accessTokenId,
      token,
      isRevoked,
      expiresAt,
      createdAt,
      updatedAt,
      deletedAt,
      accessToken,
    );
  }

  created(event: {
    payload: OAuthRefreshToken;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new OAuthCreatedRefreshTokenEvent({
        payload: {
          id: event.payload.id.value,
          accessTokenId: event.payload.accessTokenId.value,
          token: event.payload.token.value,
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

  deleted(event: {
    payload: OAuthRefreshToken;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new OAuthDeletedRefreshTokenEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          accessTokenId: event.payload.accessTokenId.value,
          token: event.payload.token.value,
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
      accessTokenId: this.accessTokenId.value,
      token: this.token.value,
      isRevoked: this.isRevoked.value,
      expiresAt: this.expiresAt?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      accessToken: this.accessToken?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      accessTokenId: this.accessTokenId.value,
      token: this.token.value,
      isRevoked: this.isRevoked.value,
      expiresAt: this.expiresAt?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      accessToken: this.accessToken?.toDTO(),
    };
  }
}
