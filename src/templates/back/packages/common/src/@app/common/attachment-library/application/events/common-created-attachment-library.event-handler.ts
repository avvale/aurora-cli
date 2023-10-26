import { CommonCreatedAttachmentLibraryEvent } from '@app/common/attachment-library';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAttachmentLibraryEvent)
export class CommonCreatedAttachmentLibraryEventHandler implements IEventHandler<CommonCreatedAttachmentLibraryEvent>
{
    handle(event: CommonCreatedAttachmentLibraryEvent): void
    {
        // console.log('CommonCreatedAttachmentLibraryEvent: ', event);
    }
}
