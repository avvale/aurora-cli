import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAttachmentFamilyEvent } from './common-updated-attachment-family.event';

@EventsHandler(CommonUpdatedAttachmentFamilyEvent)
export class CommonUpdatedAttachmentFamilyEventHandler implements IEventHandler<CommonUpdatedAttachmentFamilyEvent>
{
    handle(event: CommonUpdatedAttachmentFamilyEvent): void
    {
        // console.log('UpdatedAttachmentFamilyEvent: ', event);
    }
}
