import { CommonUpdatedAttachmentLibrariesEvent } from '@app/common/attachment-library';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAttachmentLibrariesEvent)
export class CommonUpdatedAttachmentLibrariesEventHandler implements IEventHandler<CommonUpdatedAttachmentLibrariesEvent>
{
    handle(event: CommonUpdatedAttachmentLibrariesEvent): void
    {
        // console.log('CommonUpdatedAttachmentLibrariesEvent: ', event);
    }
}
