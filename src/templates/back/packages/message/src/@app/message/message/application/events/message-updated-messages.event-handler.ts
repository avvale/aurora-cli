import { MessageUpdatedMessagesEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedMessagesEvent)
export class MessageUpdatedMessagesEventHandler implements IEventHandler<MessageUpdatedMessagesEvent>
{
    handle(event: MessageUpdatedMessagesEvent): void
    {
        // console.log('MessageUpdatedMessagesEvent: ', event);
    }
}
