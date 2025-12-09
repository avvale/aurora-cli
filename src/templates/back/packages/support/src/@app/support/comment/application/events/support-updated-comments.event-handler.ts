import { SupportUpdatedCommentsEvent } from '@app/support/comment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportUpdatedCommentsEvent)
export class SupportUpdatedCommentsEventHandler
    implements IEventHandler<SupportUpdatedCommentsEvent>
{
    handle(event: SupportUpdatedCommentsEvent): void {
        // console.log('SupportUpdatedCommentsEvent: ', event);
    }
}
