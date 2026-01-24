import { CommonUpdatedAttachmentEvent } from './common-updated-attachment.event';

export class CommonUpdatedAttachmentsEvent {
  constructor(public readonly attachments: CommonUpdatedAttachmentEvent[]) {}
}
