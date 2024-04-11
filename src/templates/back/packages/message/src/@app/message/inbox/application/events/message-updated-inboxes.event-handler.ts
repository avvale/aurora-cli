import { MessageUpdatedInboxesEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedInboxesEvent)
export class MessageUpdatedInboxesEventHandler implements IEventHandler<MessageUpdatedInboxesEvent>
{
    handle(event: MessageUpdatedInboxesEvent): void
    {
        // console.log('MessageUpdatedInboxesEvent: ', event);
    }
}
