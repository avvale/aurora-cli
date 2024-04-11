import { MessageDeletedOutboxesEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedOutboxesEvent)
export class MessageDeletedOutboxesEventHandler implements IEventHandler<MessageDeletedOutboxesEvent>
{
    handle(event: MessageDeletedOutboxesEvent): void
    {
        // console.log('DeletedOutboxesEvent: ', event);
    }
}
