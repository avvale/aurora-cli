import { CommonCreatedAttachmentLibraryEvent } from './common-created-attachment-library.event';

export class CommonCreatedAttachmentLibrariesEvent {
  constructor(
    public readonly attachmentLibraries: CommonCreatedAttachmentLibraryEvent[],
  ) {}
}
