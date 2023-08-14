import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    OAuthRefreshTokenId,
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenUpdatedAt,
    OAuthRefreshTokenDeletedAt,
} from '../../domain/value-objects';
import { OAuthRefreshToken } from '../../domain/o-auth-refresh-token.aggregate';
import { oAuthMockRefreshTokenData } from './o-auth-mock-refresh-token.data';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockRefreshTokenSeeder extends MockSeeder<OAuthRefreshToken>
{
    public collectionSource: OAuthRefreshToken[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const refreshToken of _.orderBy(oAuthMockRefreshTokenData, ['id']))
        {
            this.collectionSource.push(
                OAuthRefreshToken.register(
                    new OAuthRefreshTokenId(refreshToken.id),
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
