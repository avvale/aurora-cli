import { CommonUpdatedAttachmentFamilyEvent } from '@app/common/attachment-family';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAttachmentFamilyEvent)
export class CommonUpdatedAttachmentFamilyEventHandler
  implements IEventHandler<CommonUpdatedAttachmentFamilyEvent>
{
  handle(event: CommonUpdatedAttachmentFamilyEvent): void {
    // console.log('UpdatedAttachmentFamilyEvent: ', event);
  }
}
