import { CommonUpdatedAttachmentsEvent } from '@app/common/attachment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAttachmentsEvent)
export class CommonUpdatedAttachmentsEventHandler
  implements IEventHandler<CommonUpdatedAttachmentsEvent>
{
  handle(event: CommonUpdatedAttachmentsEvent): void {
    // console.log('CommonUpdatedAttachmentsEvent: ', event);
  }
}
