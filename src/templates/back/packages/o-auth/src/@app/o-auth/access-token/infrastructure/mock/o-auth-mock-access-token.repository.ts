import { OAuthAccessToken, OAuthIAccessTokenRepository, oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenDeletedAt,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenId,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenName,
    OAuthAccessTokenToken,
    OAuthAccessTokenUpdatedAt,
} from '@app/o-auth/access-token/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthMockAccessTokenRepository extends MockRepository<OAuthAccessToken> implements OAuthIAccessTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthAccessToken';
    public collectionSource: OAuthAccessToken[];

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
