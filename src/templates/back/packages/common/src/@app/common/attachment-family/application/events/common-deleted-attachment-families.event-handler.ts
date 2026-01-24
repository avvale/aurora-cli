import { CommonDeletedAttachmentFamiliesEvent } from '@app/common/attachment-family';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAttachmentFamiliesEvent)
export class CommonDeletedAttachmentFamiliesEventHandler
  implements IEventHandler<CommonDeletedAttachmentFamiliesEvent>
{
  handle(event: CommonDeletedAttachmentFamiliesEvent): void {
    // console.log('DeletedAttachmentFamiliesEvent: ', event);
  }
}
