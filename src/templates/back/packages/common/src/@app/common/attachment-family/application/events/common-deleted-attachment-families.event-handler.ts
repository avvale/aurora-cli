import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAttachmentFamiliesEvent } from './common-deleted-attachment-families.event';

@EventsHandler(CommonDeletedAttachmentFamiliesEvent)
export class CommonDeletedAttachmentFamiliesEventHandler implements IEventHandler<CommonDeletedAttachmentFamiliesEvent>
{
    handle(event: CommonDeletedAttachmentFamiliesEvent): void
    {
        // console.log('DeletedAttachmentFamiliesEvent: ', event);
    }
}
