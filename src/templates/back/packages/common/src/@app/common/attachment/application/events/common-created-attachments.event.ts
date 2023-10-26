import { CommonCreatedAttachmentEvent } from './common-created-attachment.event';

export class CommonCreatedAttachmentsEvent
{
    constructor(
        public readonly attachments: CommonCreatedAttachmentEvent[],
    ) {}
}
