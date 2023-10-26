import { CommonDeletedAttachmentLibraryEvent } from './common-deleted-attachment-library.event';

export class CommonDeletedAttachmentLibrariesEvent
{
    constructor(
        public readonly attachmentLibraries: CommonDeletedAttachmentLibraryEvent[],
    ) {}
}
