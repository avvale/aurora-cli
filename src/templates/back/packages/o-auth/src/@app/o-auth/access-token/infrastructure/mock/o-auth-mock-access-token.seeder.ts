import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    OAuthAccessTokenId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenAccountId,
    OAuthAccessTokenToken,
    OAuthAccessTokenName,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenUpdatedAt,
    OAuthAccessTokenDeletedAt,
} from '../../domain/value-objects';
import { OAuthAccessToken } from '../../domain/o-auth-access-token.aggregate';
import { oAuthMockAccessTokenData } from './o-auth-mock-access-token.data';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockAccessTokenSeeder extends MockSeeder<OAuthAccessToken>
{
    public collectionSource: OAuthAccessToken[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const accessToken of _.orderBy(oAuthMockAccessTokenData, ['id']))
        {
            this.collectionSource.push(
                OAuthAccessToken.register(
                    new OAuthAccessTokenId(accessToken.id),
                    new OAuthAccessTokenClientId(accessToken.clientId),
                    new OAuthAccessTokenAccountId(accessToken.accountId),
                    new OAuthAccessTokenToken(accessToken.token),
                    new OAuthAccessTokenName(accessToken.name),
                    new OAuthAccessTokenIsRevoked(accessToken.isRevoked),
                    new OAuthAccessTokenExpiresAt(accessToken.expiresAt),
                    new OAuthAccessTokenCreatedAt({ currentTimestamp: true }),
                    new OAuthAccessTokenUpdatedAt({ currentTimestamp: true }),
                    new OAuthAccessTokenDeletedAt(null),
                ),
            );
        }
    }
}
