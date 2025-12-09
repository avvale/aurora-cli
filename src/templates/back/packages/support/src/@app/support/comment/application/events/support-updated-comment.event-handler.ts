import { SupportUpdatedCommentEvent } from '@app/support/comment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportUpdatedCommentEvent)
export class SupportUpdatedCommentEventHandler
    implements IEventHandler<SupportUpdatedCommentEvent>
{
    handle(event: SupportUpdatedCommentEvent): void {
        // console.log('UpdatedCommentEvent: ', event);
    }
}
