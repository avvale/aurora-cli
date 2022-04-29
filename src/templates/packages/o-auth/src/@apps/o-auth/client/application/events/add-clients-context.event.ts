import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthClient } from '../../domain/client.aggregate';
import { CreatedClientEvent } from './created-client.event';
import { CreatedClientsEvent } from './created-clients.event';
import { DeletedClientEvent } from './deleted-client.event';
import { DeletedClientsEvent } from './deleted-clients.event';

export class AddClientsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthClient[] = [],
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
            new CreatedClientsEvent(
                this.aggregateRoots.map(client =>
                    new CreatedClientEvent(
                        client.id.value,
                        client.grantType.value,
                        client.name.value,
                        client.secret.value,
                        client.authUrl?.value,
                        client.redirect?.value,
                        client.expiredAccessToken?.value,
                        client.expiredRefreshToken?.value,
                        client.isActive.value,
                        client.isMaster.value,
                        client.applicationIds?.value,
                        client.createdAt?.value,
                        client.updatedAt?.value,
                        client.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedClientsEvent(
                this.aggregateRoots.map(client =>
                    new DeletedClientEvent(
                        client.id.value,
                        client.grantType.value,
                        client.name.value,
                        client.secret.value,
                        client.authUrl?.value,
                        client.redirect?.value,
                        client.expiredAccessToken?.value,
                        client.expiredRefreshToken?.value,
                        client.isActive.value,
                        client.isMaster.value,
                        client.applicationIds?.value,
                        client.createdAt?.value,
                        client.updatedAt?.value,
                        client.deletedAt?.value,
                    )
                )
            )
        );
    }
}