import { MessageCreatedMessagesEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedMessagesEvent)
export class MessageCreatedMessagesEventHandler implements IEventHandler<MessageCreatedMessagesEvent>
{
    handle(event: MessageCreatedMessagesEvent): void
    {
        // console.log('CreatedMessagesEvent: ', event);
    }
}
