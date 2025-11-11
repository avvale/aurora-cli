import { OAuthClient, oAuthMockClientData } from '@app/o-auth/client';
import {
    OAuthClientApplicationIds,
    OAuthClientAuthUrl,
    OAuthClientCreatedAt,
    OAuthClientDeletedAt,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientGrantType,
    OAuthClientId,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientName,
    OAuthClientRedirect,
    OAuthClientRowId,
    OAuthClientScopeOptions,
    OAuthClientSecret,
    OAuthClientUpdatedAt,
} from '@app/o-auth/client/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockClientSeeder extends MockSeeder<OAuthClient> {
    public collectionSource: OAuthClient[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const client of _.orderBy(oAuthMockClientData, ['id'])) {
            this.collectionSource.push(
                OAuthClient.register(
                    new OAuthClientId(client.id),
                    new OAuthClientRowId(client.rowId),
                    new OAuthClientGrantType(client.grantType),
                    new OAuthClientName(client.name),
                    new OAuthClientSecret(client.secret),
                    new OAuthClientAuthUrl(client.authUrl),
                    new OAuthClientRedirect(client.redirect),
                    new OAuthClientScopeOptions(client.scopeOptions),
                    new OAuthClientExpiredAccessToken(
                        client.expiredAccessToken,
                    ),
                    new OAuthClientExpiredRefreshToken(
                        client.expiredRefreshToken,
                    ),
                    new OAuthClientIsActive(client.isActive),
                    new OAuthClientIsMaster(client.isMaster),
                    new OAuthClientApplicationIds(client.applicationIds),
                    new OAuthClientCreatedAt({ currentTimestamp: true }),
                    new OAuthClientUpdatedAt({ currentTimestamp: true }),
                    new OAuthClientDeletedAt(null),
                ),
            );
        }
    }
}
