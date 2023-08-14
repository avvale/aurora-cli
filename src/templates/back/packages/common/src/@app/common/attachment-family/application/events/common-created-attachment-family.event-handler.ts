import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAttachmentFamilyEvent } from './common-created-attachment-family.event';

@EventsHandler(CommonCreatedAttachmentFamilyEvent)
export class CommonCreatedAttachmentFamilyEventHandler implements IEventHandler<CommonCreatedAttachmentFamilyEvent>
{
    handle(event: CommonCreatedAttachmentFamilyEvent): void
    {
        // console.log('CommonCreatedAttachmentFamilyEvent: ', event);
    }
}
