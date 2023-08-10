import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { OAuthIRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/o-auth-refresh-token.repository';
import {
    OAuthRefreshTokenId,
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenUpdatedAt,
    OAuthRefreshTokenDeletedAt,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { OAuthRefreshToken } from '../../domain/o-auth-refresh-token.aggregate';
import { oAuthMockRefreshTokenData } from './o-auth-mock-refresh-token.data';

@Injectable()
export class OAuthMockRefreshTokenRepository extends MockRepository<OAuthRefreshToken> implements OAuthIRefreshTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public collectionSource: OAuthRefreshToken[];
    public deletedAtInstance: OAuthRefreshTokenDeletedAt = new OAuthRefreshTokenDeletedAt(null);

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

        for (const itemCollection of <any[]>oAuthMockRefreshTokenData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthRefreshToken.register(
                new OAuthRefreshTokenId(itemCollection.id),
                new OAuthRefreshTokenAccessTokenId(itemCollection.accessTokenId),
                new OAuthRefreshTokenToken(itemCollection.token),
                new OAuthRefreshTokenIsRevoked(itemCollection.isRevoked),
                new OAuthRefreshTokenExpiresAt(itemCollection.expiresAt),
                new OAuthRefreshTokenCreatedAt(itemCollection.createdAt),
                new OAuthRefreshTokenUpdatedAt(itemCollection.updatedAt),
                new OAuthRefreshTokenDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
