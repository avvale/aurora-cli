import {
  CommonAttachmentFamily,
  CommonCreatedAttachmentFamiliesEvent,
  CommonCreatedAttachmentFamilyEvent,
  CommonDeletedAttachmentFamiliesEvent,
  CommonDeletedAttachmentFamilyEvent,
  CommonUpdatedAttachmentFamiliesEvent,
  CommonUpdatedAttachmentFamilyEvent,
} from '@app/common/attachment-family';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAttachmentFamiliesContextEvent extends AggregateRoot {
  constructor(public readonly aggregateRoots: CommonAttachmentFamily[] = []) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAttachmentFamiliesEvent(
        this.aggregateRoots.map(
          (attachmentFamily) =>
            new CommonCreatedAttachmentFamilyEvent(
              attachmentFamily.id.value,
              attachmentFamily.resourceId.value,
              attachmentFamily.code.value,
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

  updated(): void {
    this.apply(
      new CommonUpdatedAttachmentFamiliesEvent(
        this.aggregateRoots.map(
          (attachmentFamily) =>
            new CommonUpdatedAttachmentFamilyEvent(
              attachmentFamily.id.value,
              attachmentFamily.resourceId.value,
              attachmentFamily.code.value,
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

  deleted(): void {
    this.apply(
      new CommonDeletedAttachmentFamiliesEvent(
        this.aggregateRoots.map(
          (attachmentFamily) =>
            new CommonDeletedAttachmentFamilyEvent(
              attachmentFamily.id.value,
              attachmentFamily.resourceId.value,
              attachmentFamily.code.value,
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
