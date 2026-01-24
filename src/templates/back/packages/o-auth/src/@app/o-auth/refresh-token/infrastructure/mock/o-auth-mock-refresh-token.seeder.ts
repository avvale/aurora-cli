import {
  oAuthMockRefreshTokenData,
  OAuthRefreshToken,
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockRefreshTokenSeeder extends MockSeeder<OAuthRefreshToken> {
  public collectionSource: OAuthRefreshToken[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const refreshToken of _.orderBy(oAuthMockRefreshTokenData, ['id'])) {
      this.collectionSource.push(
        OAuthRefreshToken.register(
          new OAuthRefreshTokenId(refreshToken.id),
          new OAuthRefreshTokenRowId(refreshToken.rowId),
          new OAuthRefreshTokenAccessTokenId(refreshToken.accessTokenId),
          new OAuthRefreshTokenToken(refreshToken.token),
          new OAuthRefreshTokenIsRevoked(refreshToken.isRevoked),
          new OAuthRefreshTokenExpiresAt(refreshToken.expiresAt),
          new OAuthRefreshTokenCreatedAt({ currentTimestamp: true }),
          new OAuthRefreshTokenUpdatedAt({ currentTimestamp: true }),
          new OAuthRefreshTokenDeletedAt(null),
        ),
      );
    }
  }
}
