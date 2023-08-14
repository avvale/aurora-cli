import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAttachmentFamilyEvent } from './common-deleted-attachment-family.event';

@EventsHandler(CommonDeletedAttachmentFamilyEvent)
export class CommonDeletedAttachmentFamilyEventHandler implements IEventHandler<CommonDeletedAttachmentFamilyEvent>
{
    handle(event: CommonDeletedAttachmentFamilyEvent): void
    {
        // console.log('CommonDeletedAttachmentFamilyEvent: ', event);
    }
}
