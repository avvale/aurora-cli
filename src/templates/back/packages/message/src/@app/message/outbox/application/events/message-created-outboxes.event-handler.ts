import { MessageCreatedOutboxesEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedOutboxesEvent)
export class MessageCreatedOutboxesEventHandler
    implements IEventHandler<MessageCreatedOutboxesEvent>
{
    handle(event: MessageCreatedOutboxesEvent): void {
        // console.log('CreatedOutboxesEvent: ', event);
    }
}
