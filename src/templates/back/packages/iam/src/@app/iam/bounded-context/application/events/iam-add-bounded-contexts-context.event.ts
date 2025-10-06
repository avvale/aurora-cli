import { IamBoundedContext, IamCreatedBoundedContextEvent, IamCreatedBoundedContextsEvent, IamDeletedBoundedContextEvent, IamDeletedBoundedContextsEvent, IamUpdatedBoundedContextEvent, IamUpdatedBoundedContextsEvent } from '@app/iam/bounded-context';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddBoundedContextsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamBoundedContext[] = [],
        public readonly cQMetadata?: CQMetadata,
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
            new IamCreatedBoundedContextsEvent({
                payload: this.aggregateRoots.map(boundedContext =>
                    new IamCreatedBoundedContextEvent({
                        payload: {
                            id: boundedContext.id.value,
                            name: boundedContext.name.value,
                            root: boundedContext.root.value,
                            sort: boundedContext.sort?.value,
                            isActive: boundedContext.isActive.value,
                            createdAt: boundedContext.createdAt?.value,
                            updatedAt: boundedContext.updatedAt?.value,
                            deletedAt: boundedContext.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedBoundedContextsEvent({
                payload: this.aggregateRoots.map(boundedContext =>
                    new IamUpdatedBoundedContextEvent({
                        payload: {
                            id: boundedContext.id.value,
                            name: boundedContext.name.value,
                            root: boundedContext.root.value,
                            sort: boundedContext.sort?.value,
                            isActive: boundedContext.isActive.value,
                            createdAt: boundedContext.createdAt?.value,
                            updatedAt: boundedContext.updatedAt?.value,
                            deletedAt: boundedContext.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedBoundedContextsEvent({
                payload: this.aggregateRoots.map(boundedContext =>
                    new IamDeletedBoundedContextEvent({
                        payload: {
                            id: boundedContext.id.value,
                            name: boundedContext.name.value,
                            root: boundedContext.root.value,
                            sort: boundedContext.sort?.value,
                            isActive: boundedContext.isActive.value,
                            createdAt: boundedContext.createdAt?.value,
                            updatedAt: boundedContext.updatedAt?.value,
                            deletedAt: boundedContext.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
