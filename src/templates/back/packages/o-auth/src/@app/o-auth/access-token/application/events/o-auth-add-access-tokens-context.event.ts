import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthAccessToken } from '../../domain/o-auth-access-token.aggregate';
import { OAuthDeletedAccessTokenEvent } from './o-auth-deleted-access-token.event';
import { OAuthDeletedAccessTokensEvent } from './o-auth-deleted-access-tokens.event';

export class OAuthAddAccessTokensContextEvent extends AggregateRoot
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



    deleted(): void
    {
        this.apply(
            new OAuthDeletedAccessTokensEvent(
                this.aggregateRoots.map(accessToken =>
                    new OAuthDeletedAccessTokenEvent(
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
