import { OAuthClient, OAuthCreatedClientEvent, OAuthCreatedClientsEvent, OAuthDeletedClientEvent, OAuthDeletedClientsEvent, OAuthUpdatedAndIncrementedClientEvent, OAuthUpdatedAndIncrementedClientsEvent, OAuthUpdatedClientEvent, OAuthUpdatedClientsEvent } from '@app/o-auth/client';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddClientsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthClient[] = [],
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
            new OAuthCreatedClientsEvent(
                this.aggregateRoots.map(client =>
                    new OAuthCreatedClientEvent(
                        client.id.value,
                        client.grantType.value,
                        client.name.value,
                        client.secret.value,
                        client.authUrl?.value,
                        client.redirect?.value,
                        client.scopeOptions?.value,
                        client.expiredAccessToken?.value,
                        client.expiredRefreshToken?.value,
                        client.isActive.value,
                        client.isMaster.value,
                        client.applicationIds?.value,
                        client.createdAt?.value,
                        client.updatedAt?.value,
                        client.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new OAuthUpdatedClientsEvent(
                this.aggregateRoots.map(client =>
                    new OAuthUpdatedClientEvent(
                        client.id.value,
                        client.grantType.value,
                        client.name.value,
                        client.secret.value,
                        client.authUrl?.value,
                        client.redirect?.value,
                        client.scopeOptions?.value,
                        client.expiredAccessToken?.value,
                        client.expiredRefreshToken?.value,
                        client.isActive.value,
                        client.isMaster.value,
                        client.applicationIds?.value,
                        client.createdAt?.value,
                        client.updatedAt?.value,
                        client.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new OAuthUpdatedAndIncrementedClientsEvent(
                this.aggregateRoots.map(client =>
                    new OAuthUpdatedAndIncrementedClientEvent(
                        client.id.value,
                        client.grantType.value,
                        client.name.value,
                        client.secret.value,
                        client.authUrl?.value,
                        client.redirect?.value,
                        client.scopeOptions?.value,
                        client.expiredAccessToken?.value,
                        client.expiredRefreshToken?.value,
                        client.isActive.value,
                        client.isMaster.value,
                        client.applicationIds?.value,
                        client.createdAt?.value,
                        client.updatedAt?.value,
                        client.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new OAuthDeletedClientsEvent(
                this.aggregateRoots.map(client =>
                    new OAuthDeletedClientEvent(
                        client.id.value,
                        client.grantType.value,
                        client.name.value,
                        client.secret.value,
                        client.authUrl?.value,
                        client.redirect?.value,
                        client.scopeOptions?.value,
                        client.expiredAccessToken?.value,
                        client.expiredRefreshToken?.value,
                        client.isActive.value,
                        client.isMaster.value,
                        client.applicationIds?.value,
                        client.createdAt?.value,
                        client.updatedAt?.value,
                        client.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
