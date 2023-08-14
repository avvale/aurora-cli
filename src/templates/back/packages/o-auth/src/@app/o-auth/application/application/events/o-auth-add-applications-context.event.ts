import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';
import { OAuthCreatedApplicationEvent } from './o-auth-created-application.event';
import { OAuthCreatedApplicationsEvent } from './o-auth-created-applications.event';
import { OAuthUpdatedApplicationEvent } from './o-auth-updated-application.event';
import { OAuthUpdatedApplicationsEvent } from './o-auth-updated-applications.event';
import { OAuthDeletedApplicationEvent } from './o-auth-deleted-application.event';
import { OAuthDeletedApplicationsEvent } from './o-auth-deleted-applications.event';

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
