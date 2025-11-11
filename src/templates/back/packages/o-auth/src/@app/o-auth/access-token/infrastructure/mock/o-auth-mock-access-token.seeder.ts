import {
    OAuthAccessToken,
    oAuthMockAccessTokenData,
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockAccessTokenSeeder extends MockSeeder<OAuthAccessToken> {
    public collectionSource: OAuthAccessToken[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const accessToken of _.orderBy(oAuthMockAccessTokenData, ['id'])) {
            this.collectionSource.push(
                OAuthAccessToken.register(
                    new OAuthAccessTokenId(accessToken.id),
                    new OAuthAccessTokenRowId(accessToken.rowId),
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
