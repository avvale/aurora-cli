import { CommonUpdatedAttachmentLibraryEvent } from '@app/common/attachment-library';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAttachmentLibraryEvent)
export class CommonUpdatedAttachmentLibraryEventHandler implements IEventHandler<CommonUpdatedAttachmentLibraryEvent>
{
    handle(event: CommonUpdatedAttachmentLibraryEvent): void
    {
        // console.log('UpdatedAttachmentLibraryEvent: ', event);
    }
}
