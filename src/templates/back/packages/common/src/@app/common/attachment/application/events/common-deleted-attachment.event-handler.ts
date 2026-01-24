import { CommonDeletedAttachmentEvent } from '@app/common/attachment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAttachmentEvent)
export class CommonDeletedAttachmentEventHandler
  implements IEventHandler<CommonDeletedAttachmentEvent>
{
  handle(event: CommonDeletedAttachmentEvent): void {
    // console.log('CommonDeletedAttachmentEvent: ', event);
  }
}
