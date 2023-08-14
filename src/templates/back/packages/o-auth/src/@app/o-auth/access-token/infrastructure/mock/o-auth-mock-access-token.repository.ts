import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { OAuthIAccessTokenRepository } from '@app/o-auth/access-token/domain/o-auth-access-token.repository';
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
} from '@app/o-auth/access-token/domain/value-objects';
import { OAuthAccessToken } from '../../domain/o-auth-access-token.aggregate';
import { oAuthMockAccessTokenData } from './o-auth-mock-access-token.data';

@Injectable()
export class OAuthMockAccessTokenRepository extends MockRepository<OAuthAccessToken> implements OAuthIAccessTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthAccessToken';
    public collectionSource: OAuthAccessToken[];
    public deletedAtInstance: OAuthAccessTokenDeletedAt = new OAuthAccessTokenDeletedAt(null);

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

        for (const itemCollection of <any[]>oAuthMockAccessTokenData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthAccessToken.register(
                new OAuthAccessTokenId(itemCollection.id),
                new OAuthAccessTokenClientId(itemCollection.clientId),
                new OAuthAccessTokenAccountId(itemCollection.accountId),
                new OAuthAccessTokenToken(itemCollection.token),
                new OAuthAccessTokenName(itemCollection.name),
                new OAuthAccessTokenIsRevoked(itemCollection.isRevoked),
                new OAuthAccessTokenExpiresAt(itemCollection.expiresAt),
                new OAuthAccessTokenCreatedAt(itemCollection.createdAt),
                new OAuthAccessTokenUpdatedAt(itemCollection.updatedAt),
                new OAuthAccessTokenDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
