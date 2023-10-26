import { CommonUpdatedAttachmentEvent } from '@app/common/attachment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAttachmentEvent)
export class CommonUpdatedAttachmentEventHandler implements IEventHandler<CommonUpdatedAttachmentEvent>
{
    handle(event: CommonUpdatedAttachmentEvent): void
    {
        // console.log('UpdatedAttachmentEvent: ', event);
    }
}
