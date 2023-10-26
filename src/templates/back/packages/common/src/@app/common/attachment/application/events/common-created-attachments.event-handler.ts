import { CommonCreatedAttachmentsEvent } from '@app/common/attachment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAttachmentsEvent)
export class CommonCreatedAttachmentsEventHandler implements IEventHandler<CommonCreatedAttachmentsEvent>
{
    handle(event: CommonCreatedAttachmentsEvent): void
    {
        // console.log('CreatedAttachmentsEvent: ', event);
    }
}
