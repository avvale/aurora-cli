import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAttachmentFamiliesEvent } from './common-updated-attachment-families.event';

@EventsHandler(CommonUpdatedAttachmentFamiliesEvent)
export class CommonUpdatedAttachmentFamiliesEventHandler implements IEventHandler<CommonUpdatedAttachmentFamiliesEvent>
{
    handle(event: CommonUpdatedAttachmentFamiliesEvent): void
    {
        // console.log('CommonUpdatedAttachmentFamiliesEvent: ', event);
    }
}
