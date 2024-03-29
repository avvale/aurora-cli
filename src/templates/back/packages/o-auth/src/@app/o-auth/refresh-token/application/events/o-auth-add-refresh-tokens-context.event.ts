import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthRefreshToken } from '../../domain/o-auth-refresh-token.aggregate';
import { OAuthDeletedRefreshTokenEvent } from './o-auth-deleted-refresh-token.event';
import { OAuthDeletedRefreshTokensEvent } from './o-auth-deleted-refresh-tokens.event';

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
