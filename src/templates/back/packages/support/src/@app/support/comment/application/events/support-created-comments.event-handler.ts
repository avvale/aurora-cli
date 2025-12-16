import { SupportCreatedCommentsEvent } from '@app/support/comment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportCreatedCommentsEvent)
export class SupportCreatedCommentsEventHandler
    implements IEventHandler<SupportCreatedCommentsEvent>
{
    handle(event: SupportCreatedCommentsEvent): void {
        // 'CreatedCommentsEvent';
    }
}
