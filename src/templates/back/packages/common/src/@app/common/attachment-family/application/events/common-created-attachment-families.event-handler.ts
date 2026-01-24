import { CommonCreatedAttachmentFamiliesEvent } from '@app/common/attachment-family';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAttachmentFamiliesEvent)
export class CommonCreatedAttachmentFamiliesEventHandler
  implements IEventHandler<CommonCreatedAttachmentFamiliesEvent>
{
  handle(event: CommonCreatedAttachmentFamiliesEvent): void {
    // console.log('CreatedAttachmentFamiliesEvent: ', event);
  }
}
