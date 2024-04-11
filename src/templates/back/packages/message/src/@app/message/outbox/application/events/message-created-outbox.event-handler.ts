import { MessageCreatedOutboxEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedOutboxEvent)
export class MessageCreatedOutboxEventHandler implements IEventHandler<MessageCreatedOutboxEvent>
{
    handle(event: MessageCreatedOutboxEvent): void
    {
        // console.log('MessageCreatedOutboxEvent: ', event);
    }
}
