import { MessageUpdatedAndIncrementedOutboxesEvent } from '@app/message/outbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedAndIncrementedOutboxesEvent)
export class MessageUpdatedAndIncrementedOutboxesEventHandler implements IEventHandler<MessageUpdatedAndIncrementedOutboxesEvent>
{
    handle(event: MessageUpdatedAndIncrementedOutboxesEvent): void
    {
        // console.log('MessageUpdatedAndIncrementedOutboxesEvent: ', event);
    }
}
