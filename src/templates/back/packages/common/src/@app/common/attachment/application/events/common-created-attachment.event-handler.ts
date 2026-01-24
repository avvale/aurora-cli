import { CommonCreatedAttachmentEvent } from '@app/common/attachment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAttachmentEvent)
export class CommonCreatedAttachmentEventHandler
  implements IEventHandler<CommonCreatedAttachmentEvent>
{
  handle(event: CommonCreatedAttachmentEvent): void {
    // console.log('CommonCreatedAttachmentEvent: ', event);
  }
}
