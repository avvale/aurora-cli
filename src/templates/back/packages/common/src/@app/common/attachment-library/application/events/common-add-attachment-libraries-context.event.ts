import {
  CommonAttachmentLibrary,
  CommonCreatedAttachmentLibrariesEvent,
  CommonCreatedAttachmentLibraryEvent,
  CommonDeletedAttachmentLibrariesEvent,
  CommonDeletedAttachmentLibraryEvent,
  CommonUpdatedAttachmentLibrariesEvent,
  CommonUpdatedAttachmentLibraryEvent,
} from '@app/common/attachment-library';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAttachmentLibrariesContextEvent extends AggregateRoot {
  constructor(public readonly aggregateRoots: CommonAttachmentLibrary[] = []) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAttachmentLibrariesEvent(
        this.aggregateRoots.map(
          (attachmentLibrary) =>
            new CommonCreatedAttachmentLibraryEvent(
              attachmentLibrary.id.value,
              attachmentLibrary.originFilename.value,
              attachmentLibrary.filename.value,
              attachmentLibrary.mimetype.value,
              attachmentLibrary.extension.value,
              attachmentLibrary.relativePathSegments.value,
              attachmentLibrary.width.value,
              attachmentLibrary.height.value,
              attachmentLibrary.size.value,
              attachmentLibrary.url.value,
              attachmentLibrary.meta?.value,
              attachmentLibrary.createdAt?.value,
              attachmentLibrary.updatedAt?.value,
              attachmentLibrary.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  updated(): void {
    this.apply(
      new CommonUpdatedAttachmentLibrariesEvent(
        this.aggregateRoots.map(
          (attachmentLibrary) =>
            new CommonUpdatedAttachmentLibraryEvent(
              attachmentLibrary.id.value,
              attachmentLibrary.originFilename.value,
              attachmentLibrary.filename.value,
              attachmentLibrary.mimetype.value,
              attachmentLibrary.extension.value,
              attachmentLibrary.relativePathSegments.value,
              attachmentLibrary.width.value,
              attachmentLibrary.height.value,
              attachmentLibrary.size.value,
              attachmentLibrary.url.value,
              attachmentLibrary.meta?.value,
              attachmentLibrary.createdAt?.value,
              attachmentLibrary.updatedAt?.value,
              attachmentLibrary.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  deleted(): void {
    this.apply(
      new CommonDeletedAttachmentLibrariesEvent(
        this.aggregateRoots.map(
          (attachmentLibrary) =>
            new CommonDeletedAttachmentLibraryEvent(
              attachmentLibrary.id.value,
              attachmentLibrary.originFilename.value,
              attachmentLibrary.filename.value,
              attachmentLibrary.mimetype.value,
              attachmentLibrary.extension.value,
              attachmentLibrary.relativePathSegments.value,
              attachmentLibrary.width.value,
              attachmentLibrary.height.value,
              attachmentLibrary.size.value,
              attachmentLibrary.url.value,
              attachmentLibrary.meta?.value,
              attachmentLibrary.createdAt?.value,
              attachmentLibrary.updatedAt?.value,
              attachmentLibrary.deletedAt?.value,
            ),
        ),
      ),
    );
  }
}
