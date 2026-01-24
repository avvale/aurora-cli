import { CommonCreatedAttachmentLibrariesEvent } from '@app/common/attachment-library';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAttachmentLibrariesEvent)
export class CommonCreatedAttachmentLibrariesEventHandler
  implements IEventHandler<CommonCreatedAttachmentLibrariesEvent>
{
  handle(event: CommonCreatedAttachmentLibrariesEvent): void {
    // console.log('CreatedAttachmentLibrariesEvent: ', event);
  }
}
