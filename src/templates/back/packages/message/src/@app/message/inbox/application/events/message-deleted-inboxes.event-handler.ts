import { MessageDeletedInboxesEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedInboxesEvent)
export class MessageDeletedInboxesEventHandler implements IEventHandler<MessageDeletedInboxesEvent>
{
    handle(event: MessageDeletedInboxesEvent): void
    {
        // console.log('DeletedInboxesEvent: ', event);
    }
}
