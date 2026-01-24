import { CommonUpdatedAttachmentLibraryEvent } from './common-updated-attachment-library.event';

export class CommonUpdatedAttachmentLibrariesEvent {
  constructor(
    public readonly attachmentLibraries: CommonUpdatedAttachmentLibraryEvent[],
  ) {}
}
