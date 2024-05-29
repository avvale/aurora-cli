import { IamCreatedTagEvent, IamCreatedTagsEvent, IamDeletedTagEvent, IamDeletedTagsEvent, IamTag, IamUpdatedTagEvent, IamUpdatedTagsEvent } from '@app/iam/tag';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddTagsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamTag[] = [],
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
            new IamCreatedTagsEvent({
                payload: this.aggregateRoots.map(tag =>
                    new IamCreatedTagEvent({
                        payload: {
                            id: tag.id.value,
                            name: tag.name.value,
                            createdAt: tag.createdAt?.value,
                            updatedAt: tag.updatedAt?.value,
                            deletedAt: tag.deletedAt?.value,
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
            new IamUpdatedTagsEvent({
                payload: this.aggregateRoots.map(tag =>
                    new IamUpdatedTagEvent({
                        payload: {
                            id: tag.id.value,
                            name: tag.name.value,
                            createdAt: tag.createdAt?.value,
                            updatedAt: tag.updatedAt?.value,
                            deletedAt: tag.deletedAt?.value,
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
            new IamDeletedTagsEvent({
                payload: this.aggregateRoots.map(tag =>
                    new IamDeletedTagEvent({
                        payload: {
                            id: tag.id.value,
                            name: tag.name.value,
                            createdAt: tag.createdAt?.value,
                            updatedAt: tag.updatedAt?.value,
                            deletedAt: tag.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
