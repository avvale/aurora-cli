import { MessageCreatedInboxesEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedInboxesEvent)
export class MessageCreatedInboxesEventHandler
    implements IEventHandler<MessageCreatedInboxesEvent>
{
    handle(event: MessageCreatedInboxesEvent): void {
        // console.log('CreatedInboxesEvent: ', event);
    }
}
