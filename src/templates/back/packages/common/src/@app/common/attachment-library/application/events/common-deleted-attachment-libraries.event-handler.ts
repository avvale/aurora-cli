import { CommonDeletedAttachmentLibrariesEvent } from '@app/common/attachment-library';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAttachmentLibrariesEvent)
export class CommonDeletedAttachmentLibrariesEventHandler implements IEventHandler<CommonDeletedAttachmentLibrariesEvent>
{
    handle(event: CommonDeletedAttachmentLibrariesEvent): void
    {
        // console.log('DeletedAttachmentLibrariesEvent: ', event);
    }
}
