import { Injectable } from '@nestjs/common';
import { MockSeeder } from 'aurora-ts-core';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from '../../domain/value-objects';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';
import { accessTokens } from '../seeds/access-token.seed';
import * as _ from 'lodash';

@Injectable()
export class MockAccessTokenSeeder extends MockSeeder<OAuthAccessToken>
{
    public collectionSource: OAuthAccessToken[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const accessToken of _.orderBy(accessTokens, ['id']))
        {
            this.collectionSource.push(
                OAuthAccessToken.register(
                    new AccessTokenId(accessToken.id),
                    new AccessTokenClientId(accessToken.clientId),
                    new AccessTokenAccountId(accessToken.accountId),
                    new AccessTokenToken(accessToken.token),
                    new AccessTokenName(accessToken.name),
                    new AccessTokenIsRevoked(accessToken.isRevoked),
                    new AccessTokenExpiresAt(accessToken.expiresAt),
                    new AccessTokenCreatedAt({ currentTimestamp: true }),
                    new AccessTokenUpdatedAt({ currentTimestamp: true }),
                    new AccessTokenDeletedAt(null),
                ),
            );
        }
    }
}