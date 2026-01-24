import { CommonDeletedAttachmentsEvent } from '@app/common/attachment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAttachmentsEvent)
export class CommonDeletedAttachmentsEventHandler
  implements IEventHandler<CommonDeletedAttachmentsEvent>
{
  handle(event: CommonDeletedAttachmentsEvent): void {
    // console.log('DeletedAttachmentsEvent: ', event);
  }
}
