import { SupportCreatedCommentEvent } from '@app/support/comment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportCreatedCommentEvent)
export class SupportCreatedCommentEventHandler
    implements IEventHandler<SupportCreatedCommentEvent>
{
    handle(event: SupportCreatedCommentEvent): void {
        // console.log('SupportCreatedCommentEvent: ', event);
    }
}
