import { CommonCreatedAttachmentFamilyEvent } from '@app/common/attachment-family';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAttachmentFamilyEvent)
export class CommonCreatedAttachmentFamilyEventHandler implements IEventHandler<CommonCreatedAttachmentFamilyEvent>
{
    handle(event: CommonCreatedAttachmentFamilyEvent): void
    {
        // console.log('CommonCreatedAttachmentFamilyEvent: ', event);
    }
}
