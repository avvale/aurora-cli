import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from 'aurora-ts-core';
import { IRefreshTokenRepository } from '@apps/o-auth/refresh-token/domain/refresh-token.repository';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '@apps/o-auth/refresh-token/domain/value-objects';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { refreshTokens } from '../seeds/refresh-token.seed';

@Injectable()
export class MockRefreshTokenRepository extends MockRepository<OAuthRefreshToken> implements IRefreshTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public collectionSource: OAuthRefreshToken[];
    public deletedAtInstance: RefreshTokenDeletedAt = new RefreshTokenDeletedAt(null);

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

        for (const itemCollection of <any[]>refreshTokens)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthRefreshToken.register(
                new RefreshTokenId(itemCollection.id),
                new RefreshTokenAccessTokenId(itemCollection.accessTokenId),
                new RefreshTokenToken(itemCollection.token),
                new RefreshTokenIsRevoked(itemCollection.isRevoked),
                new RefreshTokenExpiresAt(itemCollection.expiresAt),
                new RefreshTokenCreatedAt(itemCollection.createdAt),
                new RefreshTokenUpdatedAt(itemCollection.updatedAt),
                new RefreshTokenDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}