import { IamBoundedContext, IamCreatedBoundedContextEvent, IamCreatedBoundedContextsEvent, IamDeletedBoundedContextEvent, IamDeletedBoundedContextsEvent, IamUpdatedBoundedContextEvent, IamUpdatedBoundedContextsEvent } from '@app/iam/bounded-context';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddBoundedContextsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamBoundedContext[] = [],
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
            new IamCreatedBoundedContextsEvent(
                this.aggregateRoots.map(boundedContext =>
                    new IamCreatedBoundedContextEvent(
                        boundedContext.id.value,
                        boundedContext.name.value,
                        boundedContext.root.value,
                        boundedContext.sort?.value,
                        boundedContext.isActive.value,
                        boundedContext.createdAt?.value,
                        boundedContext.updatedAt?.value,
                        boundedContext.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedBoundedContextsEvent(
                this.aggregateRoots.map(boundedContext =>
                    new IamUpdatedBoundedContextEvent(
                        boundedContext.id.value,
                        boundedContext.name.value,
                        boundedContext.root.value,
                        boundedContext.sort?.value,
                        boundedContext.isActive.value,
                        boundedContext.createdAt?.value,
                        boundedContext.updatedAt?.value,
                        boundedContext.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedBoundedContextsEvent(
                this.aggregateRoots.map(boundedContext =>
                    new IamDeletedBoundedContextEvent(
                        boundedContext.id.value,
                        boundedContext.name.value,
                        boundedContext.root.value,
                        boundedContext.sort?.value,
                        boundedContext.isActive.value,
                        boundedContext.createdAt?.value,
                        boundedContext.updatedAt?.value,
                        boundedContext.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
