import { CommonCreatedResourceEvent, CommonCreatedResourcesEvent, CommonDeletedResourceEvent, CommonDeletedResourcesEvent, CommonResource, CommonUpdatedResourceEvent, CommonUpdatedResourcesEvent } from '@app/common/resource';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddResourcesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CommonResource[] = [],
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
            new CommonCreatedResourcesEvent(
                this.aggregateRoots.map(resource =>
                    new CommonCreatedResourceEvent(
                        resource.id.value,
                        resource.code.value,
                        resource.name.value,
                        resource.isActive.value,
                        resource.hasAttachments.value,
                        resource.createdAt?.value,
                        resource.updatedAt?.value,
                        resource.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new CommonUpdatedResourcesEvent(
                this.aggregateRoots.map(resource =>
                    new CommonUpdatedResourceEvent(
                        resource.id.value,
                        resource.code.value,
                        resource.name.value,
                        resource.isActive.value,
                        resource.hasAttachments.value,
                        resource.createdAt?.value,
                        resource.updatedAt?.value,
                        resource.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new CommonDeletedResourcesEvent(
                this.aggregateRoots.map(resource =>
                    new CommonDeletedResourceEvent(
                        resource.id.value,
                        resource.code.value,
                        resource.name.value,
                        resource.isActive.value,
                        resource.hasAttachments.value,
                        resource.createdAt?.value,
                        resource.updatedAt?.value,
                        resource.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
