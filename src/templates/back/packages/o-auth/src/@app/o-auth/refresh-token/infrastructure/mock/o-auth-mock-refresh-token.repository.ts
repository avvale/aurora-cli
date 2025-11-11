import {
    OAuthIRefreshTokenRepository,
    oAuthMockRefreshTokenData,
    OAuthRefreshToken,
} from '@app/o-auth/refresh-token';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenDeletedAt,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenRowId,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenUpdatedAt,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthMockRefreshTokenRepository
    extends MockRepository<OAuthRefreshToken>
    implements OAuthIRefreshTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public collectionSource: OAuthRefreshToken[];

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

        for (const itemCollection of <any[]>oAuthMockRefreshTokenData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                OAuthRefreshToken.register(
                    new OAuthRefreshTokenId(itemCollection.id),
                    new OAuthRefreshTokenRowId(itemCollection.rowId),
                    new OAuthRefreshTokenAccessTokenId(
                        itemCollection.accessTokenId,
                    ),
                    new OAuthRefreshTokenToken(itemCollection.token),
                    new OAuthRefreshTokenIsRevoked(itemCollection.isRevoked),
                    new OAuthRefreshTokenExpiresAt(itemCollection.expiresAt),
                    new OAuthRefreshTokenCreatedAt(itemCollection.createdAt),
                    new OAuthRefreshTokenUpdatedAt(itemCollection.updatedAt),
                    new OAuthRefreshTokenDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
