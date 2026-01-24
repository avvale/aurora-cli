import { CommonUpdatedAttachmentFamilyEvent } from './common-updated-attachment-family.event';

export class CommonUpdatedAttachmentFamiliesEvent {
  constructor(
    public readonly attachmentFamilies: CommonUpdatedAttachmentFamilyEvent[],
  ) {}
}
