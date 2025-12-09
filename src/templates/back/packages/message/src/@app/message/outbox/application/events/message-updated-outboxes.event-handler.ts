import { MessageUpdatedOutboxesEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedOutboxesEvent)
export class MessageUpdatedOutboxesEventHandler
    implements IEventHandler<MessageUpdatedOutboxesEvent>
{
    handle(event: MessageUpdatedOutboxesEvent): void {
        // console.log('MessageUpdatedOutboxesEvent: ', event);
    }
}
