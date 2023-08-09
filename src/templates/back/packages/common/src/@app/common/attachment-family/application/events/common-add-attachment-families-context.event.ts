import { AggregateRoot } from '@nestjs/cqrs';
import { CommonAttachmentFamily } from '../../domain/common-attachment-family.aggregate';
import { CommonCreatedAttachmentFamilyEvent } from './common-created-attachment-family.event';
import { CommonCreatedAttachmentFamiliesEvent } from './common-created-attachment-families.event';
import { CommonUpdatedAttachmentFamilyEvent } from './common-updated-attachment-family.event';
import { CommonUpdatedAttachmentFamiliesEvent } from './common-updated-attachment-families.event';
import { CommonDeletedAttachmentFamilyEvent } from './common-deleted-attachment-family.event';
import { CommonDeletedAttachmentFamiliesEvent } from './common-deleted-attachment-families.event';

export class CommonAddAttachmentFamiliesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CommonAttachmentFamily[] = [],
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
            new CommonCreatedAttachmentFamiliesEvent(
                this.aggregateRoots.map(attachmentFamily =>
                    new CommonCreatedAttachmentFamilyEvent(
                        attachmentFamily.id.value,
                        attachmentFamily.resourceId.value,
                        attachmentFamily.name.value,
                        attachmentFamily.width?.value,
                        attachmentFamily.height?.value,
                        attachmentFamily.fitType?.value,
                        attachmentFamily.quality?.value,
                        attachmentFamily.sizes?.value,
                        attachmentFamily.format?.value,
                        attachmentFamily.createdAt?.value,
                        attachmentFamily.updatedAt?.value,
                        attachmentFamily.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new CommonUpdatedAttachmentFamiliesEvent(
                this.aggregateRoots.map(attachmentFamily =>
                    new CommonUpdatedAttachmentFamilyEvent(
                        attachmentFamily.id.value,
                        attachmentFamily.resourceId.value,
                        attachmentFamily.name.value,
                        attachmentFamily.width?.value,
                        attachmentFamily.height?.value,
                        attachmentFamily.fitType?.value,
                        attachmentFamily.quality?.value,
                        attachmentFamily.sizes?.value,
                        attachmentFamily.format?.value,
                        attachmentFamily.createdAt?.value,
                        attachmentFamily.updatedAt?.value,
                        attachmentFamily.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new CommonDeletedAttachmentFamiliesEvent(
                this.aggregateRoots.map(attachmentFamily =>
                    new CommonDeletedAttachmentFamilyEvent(
                        attachmentFamily.id.value,
                        attachmentFamily.resourceId.value,
                        attachmentFamily.name.value,
                        attachmentFamily.width?.value,
                        attachmentFamily.height?.value,
                        attachmentFamily.fitType?.value,
                        attachmentFamily.quality?.value,
                        attachmentFamily.sizes?.value,
                        attachmentFamily.format?.value,
                        attachmentFamily.createdAt?.value,
                        attachmentFamily.updatedAt?.value,
                        attachmentFamily.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
