import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { CreatedRefreshTokenEvent } from './created-refresh-token.event';
import { CreatedRefreshTokensEvent } from './created-refresh-tokens.event';
import { DeletedRefreshTokenEvent } from './deleted-refresh-token.event';
import { DeletedRefreshTokensEvent } from './deleted-refresh-tokens.event';

export class AddRefreshTokensContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthRefreshToken[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedRefreshTokensEvent(
                this.aggregateRoots.map(refreshToken =>
                    new CreatedRefreshTokenEvent(
                        refreshToken.id.value,
                        refreshToken.accessTokenId.value,
                        refreshToken.token.value,
                        refreshToken.isRevoked.value,
                        refreshToken.expiresAt?.value,
                        refreshToken.createdAt?.value,
                        refreshToken.updatedAt?.value,
                        refreshToken.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedRefreshTokensEvent(
                this.aggregateRoots.map(refreshToken =>
                    new DeletedRefreshTokenEvent(
                        refreshToken.id.value,
                        refreshToken.accessTokenId.value,
                        refreshToken.token.value,
                        refreshToken.isRevoked.value,
                        refreshToken.expiresAt?.value,
                        refreshToken.createdAt?.value,
                        refreshToken.updatedAt?.value,
                        refreshToken.deletedAt?.value,
                    )
                )
            )
        );
    }
}