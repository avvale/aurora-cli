import { SupportDeletedCommentsEvent } from '@app/support/comment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportDeletedCommentsEvent)
export class SupportDeletedCommentsEventHandler
  implements IEventHandler<SupportDeletedCommentsEvent>
{
  handle(event: SupportDeletedCommentsEvent): void {
    // 'DeletedCommentsEvent'
  }
}
