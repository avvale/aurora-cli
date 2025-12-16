import { SupportDeletedCommentEvent } from '@app/support/comment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportDeletedCommentEvent)
export class SupportDeletedCommentEventHandler
    implements IEventHandler<SupportDeletedCommentEvent>
{
    handle(event: SupportDeletedCommentEvent): void {
        // SupportDeletedCommentEvent'
    }
}
