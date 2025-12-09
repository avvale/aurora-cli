import { MessageDeletedOutboxEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedOutboxEvent)
export class MessageDeletedOutboxEventHandler
    implements IEventHandler<MessageDeletedOutboxEvent>
{
    handle(event: MessageDeletedOutboxEvent): void {
        // console.log('MessageDeletedOutboxEvent: ', event);
    }
}
