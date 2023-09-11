import { OAuthApplicationClient, OAuthCreatedApplicationClientEvent, OAuthCreatedApplicationsClientsEvent, OAuthDeletedApplicationClientEvent, OAuthDeletedApplicationsClientsEvent, OAuthUpdatedApplicationClientEvent, OAuthUpdatedApplicationsClientsEvent } from '@app/o-auth/application-client';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddApplicationsClientsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthApplicationClient[] = [],
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
            new OAuthCreatedApplicationsClientsEvent(
                this.aggregateRoots.map(applicationClient =>
                    new OAuthCreatedApplicationClientEvent(
                        applicationClient.applicationId.value,
                        applicationClient.clientId.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new OAuthUpdatedApplicationsClientsEvent(
                this.aggregateRoots.map(applicationClient =>
                    new OAuthUpdatedApplicationClientEvent(
                        applicationClient.applicationId.value,
                        applicationClient.clientId.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new OAuthDeletedApplicationsClientsEvent(
                this.aggregateRoots.map(applicationClient =>
                    new OAuthDeletedApplicationClientEvent(
                        applicationClient.applicationId.value,
                        applicationClient.clientId.value,
                    ),
                ),
            ),
        );
    }
}
