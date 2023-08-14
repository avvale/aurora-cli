import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { OAuthIClientRepository } from '@app/o-auth/client/domain/o-auth-client.repository';
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
} from '@app/o-auth/client/domain/value-objects';
import { OAuthClient } from '../../domain/o-auth-client.aggregate';
import { oAuthMockClientData } from './o-auth-mock-client.data';

@Injectable()
export class OAuthMockClientRepository extends MockRepository<OAuthClient> implements OAuthIClientRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthClient';
    public collectionSource: OAuthClient[];
    public deletedAtInstance: OAuthClientDeletedAt = new OAuthClientDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>oAuthMockClientData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthClient.register(
                new OAuthClientId(itemCollection.id),
                new OAuthClientGrantType(itemCollection.grantType),
                new OAuthClientName(itemCollection.name),
                new OAuthClientSecret(itemCollection.secret),
                new OAuthClientAuthUrl(itemCollection.authUrl),
                new OAuthClientRedirect(itemCollection.redirect),
                new OAuthClientScopeOptions(itemCollection.scopeOptions),
                new OAuthClientExpiredAccessToken(itemCollection.expiredAccessToken),
                new OAuthClientExpiredRefreshToken(itemCollection.expiredRefreshToken),
                new OAuthClientIsActive(itemCollection.isActive),
                new OAuthClientIsMaster(itemCollection.isMaster),
                new OAuthClientApplicationIds(itemCollection.applicationIds),
                new OAuthClientCreatedAt(itemCollection.createdAt),
                new OAuthClientUpdatedAt(itemCollection.updatedAt),
                new OAuthClientDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
