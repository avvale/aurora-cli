import { CommonDeletedAttachmentEvent } from './common-deleted-attachment.event';

export class CommonDeletedAttachmentsEvent {
  constructor(public readonly attachments: CommonDeletedAttachmentEvent[]) {}
}
