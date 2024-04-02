import { IamCreatedTagEvent, IamCreatedTagsEvent, IamDeletedTagEvent, IamDeletedTagsEvent, IamTag, IamUpdatedAndIncrementedTagEvent, IamUpdatedAndIncrementedTagsEvent, IamUpdatedTagEvent, IamUpdatedTagsEvent } from '@app/iam/tag';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddTagsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamTag[] = [],
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
            new IamCreatedTagsEvent(
                this.aggregateRoots.map(tag =>
                    new IamCreatedTagEvent(
                        tag.id.value,
                        tag.name.value,
                        tag.createdAt?.value,
                        tag.updatedAt?.value,
                        tag.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedTagsEvent(
                this.aggregateRoots.map(tag =>
                    new IamUpdatedTagEvent(
                        tag.id.value,
                        tag.name.value,
                        tag.createdAt?.value,
                        tag.updatedAt?.value,
                        tag.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new IamUpdatedAndIncrementedTagsEvent(
                this.aggregateRoots.map(tag =>
                    new IamUpdatedAndIncrementedTagEvent(
                        tag.id.value,
                        tag.name.value,
                        tag.createdAt?.value,
                        tag.updatedAt?.value,
                        tag.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedTagsEvent(
                this.aggregateRoots.map(tag =>
                    new IamDeletedTagEvent(
                        tag.id.value,
                        tag.name.value,
                        tag.createdAt?.value,
                        tag.updatedAt?.value,
                        tag.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
