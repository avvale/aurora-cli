import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    OAuthClientId,
    OAuthClientGrantType,
    OAuthClientName,
    OAuthClientSecret,
    OAuthClientAuthUrl,
    OAuthClientRedirect,
    OAuthClientScopeOptions,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientApplicationIds,
    OAuthClientCreatedAt,
    OAuthClientUpdatedAt,
    OAuthClientDeletedAt,
} from '../../domain/value-objects';
import { OAuthClient } from '../../domain/o-auth-client.aggregate';
import { oAuthMockClientData } from './o-auth-mock-client.data';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockClientSeeder extends MockSeeder<OAuthClient>
{
    public collectionSource: OAuthClient[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const client of _.orderBy(oAuthMockClientData, ['id']))
        {
            this.collectionSource.push(
                OAuthClient.register(
                    new OAuthClientId(client.id),
                    new OAuthClientGrantType(client.grantType),
                    new OAuthClientName(client.name),
                    new OAuthClientSecret(client.secret),
                    new OAuthClientAuthUrl(client.authUrl),
                    new OAuthClientRedirect(client.redirect),
                    new OAuthClientScopeOptions(client.scopeOptions),
                    new OAuthClientExpiredAccessToken(client.expiredAccessToken),
                    new OAuthClientExpiredRefreshToken(client.expiredRefreshToken),
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
