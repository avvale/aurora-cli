import {
    OAuthDeletedRefreshTokenEvent,
    OAuthDeletedRefreshTokensEvent,
    OAuthRefreshToken,
} from '@app/o-auth/refresh-token';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddRefreshTokensContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: OAuthRefreshToken[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    deleted(): void {
        this.apply(
            new OAuthDeletedRefreshTokensEvent({
                payload: this.aggregateRoots.map(
                    (refreshToken) =>
                        new OAuthDeletedRefreshTokenEvent({
                            payload: {
                                id: refreshToken.id.value,
                                rowId: refreshToken.rowId.value,
                                accessTokenId: refreshToken.accessTokenId.value,
                                token: refreshToken.token.value,
                                isRevoked: refreshToken.isRevoked.value,
                                expiresAt: refreshToken.expiresAt?.value,
                                createdAt: refreshToken.createdAt?.value,
                                updatedAt: refreshToken.updatedAt?.value,
                                deletedAt: refreshToken.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
