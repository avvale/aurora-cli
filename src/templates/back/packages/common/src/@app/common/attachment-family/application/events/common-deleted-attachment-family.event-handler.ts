import { CommonDeletedAttachmentFamilyEvent } from '@app/common/attachment-family';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAttachmentFamilyEvent)
export class CommonDeletedAttachmentFamilyEventHandler implements IEventHandler<CommonDeletedAttachmentFamilyEvent>
{
    handle(event: CommonDeletedAttachmentFamilyEvent): void
    {
        // console.log('CommonDeletedAttachmentFamilyEvent: ', event);
    }
}
