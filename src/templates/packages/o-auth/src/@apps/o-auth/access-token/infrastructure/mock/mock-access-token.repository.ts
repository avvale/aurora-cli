import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from 'aurora-ts-core';
import { IAccessTokenRepository } from '../../../../../@apps/o-auth/access-token/domain/access-token.repository';
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
} from '../../../../../@apps/o-auth/access-token/domain/value-objects';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';
import { accessTokens } from '../seeds/access-token.seed';

@Injectable()
export class MockAccessTokenRepository extends MockRepository<OAuthAccessToken> implements IAccessTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthAccessToken';
    public collectionSource: OAuthAccessToken[];
    public deletedAtInstance: AccessTokenDeletedAt = new AccessTokenDeletedAt(null);

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

        for (const itemCollection of <any[]>accessTokens)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthAccessToken.register(
                new AccessTokenId(itemCollection.id),
                new AccessTokenClientId(itemCollection.clientId),
                new AccessTokenAccountId(itemCollection.accountId),
                new AccessTokenToken(itemCollection.token),
                new AccessTokenName(itemCollection.name),
                new AccessTokenIsRevoked(itemCollection.isRevoked),
                new AccessTokenExpiresAt(itemCollection.expiresAt),
                new AccessTokenCreatedAt(itemCollection.createdAt),
                new AccessTokenUpdatedAt(itemCollection.updatedAt),
                new AccessTokenDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}