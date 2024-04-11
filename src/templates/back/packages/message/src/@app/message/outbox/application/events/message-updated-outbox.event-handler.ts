import { MessageUpdatedOutboxEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedOutboxEvent)
export class MessageUpdatedOutboxEventHandler implements IEventHandler<MessageUpdatedOutboxEvent>
{
    handle(event: MessageUpdatedOutboxEvent): void
    {
        // console.log('UpdatedOutboxEvent: ', event);
    }
}
