import { OAuthAccessToken, OAuthDeletedAccessTokenEvent, OAuthDeletedAccessTokensEvent } from '@app/o-auth/access-token';
import { AggregateRoot } from '@nestjs/cqrs';

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
