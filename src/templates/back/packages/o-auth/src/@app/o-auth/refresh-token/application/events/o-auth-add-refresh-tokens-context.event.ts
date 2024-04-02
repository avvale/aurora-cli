import { OAuthDeletedRefreshTokenEvent, OAuthDeletedRefreshTokensEvent, OAuthRefreshToken, OAuthUpdatedAndIncrementedRefreshTokenEvent, OAuthUpdatedAndIncrementedRefreshTokensEvent } from '@app/o-auth/refresh-token';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddRefreshTokensContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthRefreshToken[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }



    updatedAndIncremented(): void
    {
        this.apply(
            new OAuthUpdatedAndIncrementedRefreshTokensEvent(
                this.aggregateRoots.map(refreshToken =>
                    new OAuthUpdatedAndIncrementedRefreshTokenEvent(
                        refreshToken.id.value,
                        refreshToken.accessTokenId.value,
                        refreshToken.token.value,
                        refreshToken.isRevoked.value,
                        refreshToken.expiresAt?.value,
                        refreshToken.createdAt?.value,
                        refreshToken.updatedAt?.value,
                        refreshToken.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new OAuthDeletedRefreshTokensEvent(
                this.aggregateRoots.map(refreshToken =>
                    new OAuthDeletedRefreshTokenEvent(
                        refreshToken.id.value,
                        refreshToken.accessTokenId.value,
                        refreshToken.token.value,
                        refreshToken.isRevoked.value,
                        refreshToken.expiresAt?.value,
                        refreshToken.createdAt?.value,
                        refreshToken.updatedAt?.value,
                        refreshToken.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
