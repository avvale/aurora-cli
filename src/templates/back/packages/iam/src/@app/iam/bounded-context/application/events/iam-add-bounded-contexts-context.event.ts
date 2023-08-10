import { AggregateRoot } from '@nestjs/cqrs';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';
import { IamCreatedBoundedContextEvent } from './iam-created-bounded-context.event';
import { IamCreatedBoundedContextsEvent } from './iam-created-bounded-contexts.event';
import { IamUpdatedBoundedContextEvent } from './iam-updated-bounded-context.event';
import { IamUpdatedBoundedContextsEvent } from './iam-updated-bounded-contexts.event';
import { IamDeletedBoundedContextEvent } from './iam-deleted-bounded-context.event';
import { IamDeletedBoundedContextsEvent } from './iam-deleted-bounded-contexts.event';

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
