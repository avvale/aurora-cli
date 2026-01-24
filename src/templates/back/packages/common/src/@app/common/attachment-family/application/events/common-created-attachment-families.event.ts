import { CommonCreatedAttachmentFamilyEvent } from './common-created-attachment-family.event';

export class CommonCreatedAttachmentFamiliesEvent {
  constructor(
    public readonly attachmentFamilies: CommonCreatedAttachmentFamilyEvent[],
  ) {}
}
