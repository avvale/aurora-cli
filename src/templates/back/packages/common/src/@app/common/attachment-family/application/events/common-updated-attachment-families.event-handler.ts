import { CommonUpdatedAttachmentFamiliesEvent } from '@app/common/attachment-family';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAttachmentFamiliesEvent)
export class CommonUpdatedAttachmentFamiliesEventHandler
  implements IEventHandler<CommonUpdatedAttachmentFamiliesEvent>
{
  handle(event: CommonUpdatedAttachmentFamiliesEvent): void {
    // console.log('CommonUpdatedAttachmentFamiliesEvent: ', event);
  }
}
