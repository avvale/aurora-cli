import {
  CommonAttachment,
  CommonCreatedAttachmentEvent,
  CommonCreatedAttachmentsEvent,
  CommonDeletedAttachmentEvent,
  CommonDeletedAttachmentsEvent,
  CommonUpdatedAttachmentEvent,
  CommonUpdatedAttachmentsEvent,
} from '@app/common/attachment';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAttachmentsContextEvent extends AggregateRoot {
  constructor(public readonly aggregateRoots: CommonAttachment[] = []) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAttachmentsEvent(
        this.aggregateRoots.map(
          (attachment) =>
            new CommonCreatedAttachmentEvent(
              attachment.id.value,
              attachment.familyId?.value,
              attachment.attachableId.value,
              attachment.langId?.value,
              attachment.sort?.value,
              attachment.alt?.value,
              attachment.title?.value,
              attachment.originFilename.value,
              attachment.filename.value,
              attachment.mimetype.value,
              attachment.extension.value,
              attachment.relativePathSegments.value,
              attachment.width?.value,
              attachment.height?.value,
              attachment.size.value,
              attachment.url.value,
              attachment.isCropable.value,
              attachment.libraryId?.value,
              attachment.libraryFilename?.value,
              attachment.sizes?.value,
              attachment.meta?.value,
              attachment.createdAt?.value,
              attachment.updatedAt?.value,
              attachment.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  updated(): void {
    this.apply(
      new CommonUpdatedAttachmentsEvent(
        this.aggregateRoots.map(
          (attachment) =>
            new CommonUpdatedAttachmentEvent(
              attachment.id.value,
              attachment.familyId?.value,
              attachment.attachableId.value,
              attachment.langId?.value,
              attachment.sort?.value,
              attachment.alt?.value,
              attachment.title?.value,
              attachment.originFilename.value,
              attachment.filename.value,
              attachment.mimetype.value,
              attachment.extension.value,
              attachment.relativePathSegments.value,
              attachment.width?.value,
              attachment.height?.value,
              attachment.size.value,
              attachment.url.value,
              attachment.isCropable.value,
              attachment.libraryId?.value,
              attachment.libraryFilename?.value,
              attachment.sizes?.value,
              attachment.meta?.value,
              attachment.createdAt?.value,
              attachment.updatedAt?.value,
              attachment.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  deleted(): void {
    this.apply(
      new CommonDeletedAttachmentsEvent(
        this.aggregateRoots.map(
          (attachment) =>
            new CommonDeletedAttachmentEvent(
              attachment.id.value,
              attachment.familyId?.value,
              attachment.attachableId.value,
              attachment.langId?.value,
              attachment.sort?.value,
              attachment.alt?.value,
              attachment.title?.value,
              attachment.originFilename.value,
              attachment.filename.value,
              attachment.mimetype.value,
              attachment.extension.value,
              attachment.relativePathSegments.value,
              attachment.width?.value,
              attachment.height?.value,
              attachment.size.value,
              attachment.url.value,
              attachment.isCropable.value,
              attachment.libraryId?.value,
              attachment.libraryFilename?.value,
              attachment.sizes?.value,
              attachment.meta?.value,
              attachment.createdAt?.value,
              attachment.updatedAt?.value,
              attachment.deletedAt?.value,
            ),
        ),
      ),
    );
  }
}
