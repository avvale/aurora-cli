import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthApplication } from '../../domain/application.aggregate';
import { CreatedApplicationEvent } from './created-application.event';
import { CreatedApplicationsEvent } from './created-applications.event';
import { DeletedApplicationEvent } from './deleted-application.event';
import { DeletedApplicationsEvent } from './deleted-applications.event';

export class AddApplicationsContextEvent extends AggregateRoot
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
            new CreatedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new CreatedApplicationEvent(
                        application.id.value,
                        application.name.value,
                        application.code.value,
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
            new DeletedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new DeletedApplicationEvent(
                        application.id.value,
                        application.name.value,
                        application.code.value,
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