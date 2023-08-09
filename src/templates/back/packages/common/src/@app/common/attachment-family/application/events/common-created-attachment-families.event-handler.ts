import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAttachmentFamiliesEvent } from './common-created-attachment-families.event';

@EventsHandler(CommonCreatedAttachmentFamiliesEvent)
export class CommonCreatedAttachmentFamiliesEventHandler implements IEventHandler<CommonCreatedAttachmentFamiliesEvent>
{
    handle(event: CommonCreatedAttachmentFamiliesEvent): void
    {
        // console.log('CreatedAttachmentFamiliesEvent: ', event);
    }
}
