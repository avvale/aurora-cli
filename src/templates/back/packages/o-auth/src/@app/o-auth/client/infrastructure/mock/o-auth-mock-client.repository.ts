import {
    OAuthClient,
    OAuthIClientRepository,
    oAuthMockClientData,
} from '@app/o-auth/client';
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
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthMockClientRepository
    extends MockRepository<OAuthClient>
    implements OAuthIClientRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthClient';
    public collectionSource: OAuthClient[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>oAuthMockClientData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                OAuthClient.register(
                    new OAuthClientId(itemCollection.id),
                    new OAuthClientRowId(itemCollection.rowId),
                    new OAuthClientGrantType(itemCollection.grantType),
                    new OAuthClientName(itemCollection.name),
                    new OAuthClientSecret(itemCollection.secret),
                    new OAuthClientAuthUrl(itemCollection.authUrl),
                    new OAuthClientRedirect(itemCollection.redirect),
                    new OAuthClientScopeOptions(itemCollection.scopeOptions),
                    new OAuthClientExpiredAccessToken(
                        itemCollection.expiredAccessToken,
                    ),
                    new OAuthClientExpiredRefreshToken(
                        itemCollection.expiredRefreshToken,
                    ),
                    new OAuthClientIsActive(itemCollection.isActive),
                    new OAuthClientIsMaster(itemCollection.isMaster),
                    new OAuthClientApplicationIds(
                        itemCollection.applicationIds,
                    ),
                    new OAuthClientCreatedAt(itemCollection.createdAt),
                    new OAuthClientUpdatedAt(itemCollection.updatedAt),
                    new OAuthClientDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
