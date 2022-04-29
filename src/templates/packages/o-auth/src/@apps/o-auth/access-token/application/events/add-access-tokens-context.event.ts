import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';
import { CreatedAccessTokenEvent } from './created-access-token.event';
import { CreatedAccessTokensEvent } from './created-access-tokens.event';
import { DeletedAccessTokenEvent } from './deleted-access-token.event';
import { DeletedAccessTokensEvent } from './deleted-access-tokens.event';

export class AddAccessTokensContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthAccessToken[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new CreatedAccessTokensEvent(
                this.aggregateRoots.map(accessToken =>
                    new CreatedAccessTokenEvent(
                        accessToken.id.value,
                        accessToken.clientId.value,
                        accessToken.accountId?.value,
                        accessToken.token.value,
                        accessToken.name?.value,
                        accessToken.isRevoked.value,
                        accessToken.expiresAt?.value,
                        accessToken.createdAt?.value,
                        accessToken.updatedAt?.value,
                        accessToken.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new DeletedAccessTokensEvent(
                this.aggregateRoots.map(accessToken =>
                    new DeletedAccessTokenEvent(
                        accessToken.id.value,
                        accessToken.clientId.value,
                        accessToken.accountId?.value,
                        accessToken.token.value,
                        accessToken.name?.value,
                        accessToken.isRevoked.value,
                        accessToken.expiresAt?.value,
                        accessToken.createdAt?.value,
                        accessToken.updatedAt?.value,
                        accessToken.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}