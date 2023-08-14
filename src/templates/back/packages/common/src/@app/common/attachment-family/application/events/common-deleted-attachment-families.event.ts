import { CommonDeletedAttachmentFamilyEvent } from './common-deleted-attachment-family.event';

export class CommonDeletedAttachmentFamiliesEvent
{
    constructor(
        public readonly attachmentFamilies: CommonDeletedAttachmentFamilyEvent[],
    ) {}
}
