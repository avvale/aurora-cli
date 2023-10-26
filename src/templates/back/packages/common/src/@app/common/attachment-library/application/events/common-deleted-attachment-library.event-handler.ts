import { CommonDeletedAttachmentLibraryEvent } from '@app/common/attachment-library';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAttachmentLibraryEvent)
export class CommonDeletedAttachmentLibraryEventHandler implements IEventHandler<CommonDeletedAttachmentLibraryEvent>
{
    handle(event: CommonDeletedAttachmentLibraryEvent): void
    {
        // console.log('CommonDeletedAttachmentLibraryEvent: ', event);
    }
}
