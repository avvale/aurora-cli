import { OAuthApplication, OAuthCreatedApplicationEvent, OAuthCreatedApplicationsEvent, OAuthDeletedApplicationEvent, OAuthDeletedApplicationsEvent, OAuthUpdatedAndIncrementedApplicationEvent, OAuthUpdatedAndIncrementedApplicationsEvent, OAuthUpdatedApplicationEvent, OAuthUpdatedApplicationsEvent } from '@app/o-auth/application';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddApplicationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthApplication[] = [],
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
            new OAuthCreatedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new OAuthCreatedApplicationEvent(
                        application.id.value,
                        application.code.value,
                        application.name.value,
                        application.secret.value,
                        application.isMaster.value,
                        application.clientIds?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new OAuthUpdatedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new OAuthUpdatedApplicationEvent(
                        application.id.value,
                        application.code.value,
                        application.name.value,
                        application.secret.value,
                        application.isMaster.value,
                        application.clientIds?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new OAuthUpdatedAndIncrementedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new OAuthUpdatedAndIncrementedApplicationEvent(
                        application.id.value,
                        application.code.value,
                        application.name.value,
                        application.secret.value,
                        application.isMaster.value,
                        application.clientIds?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new OAuthDeletedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new OAuthDeletedApplicationEvent(
                        application.id.value,
                        application.code.value,
                        application.name.value,
                        application.secret.value,
                        application.isMaster.value,
                        application.clientIds?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
