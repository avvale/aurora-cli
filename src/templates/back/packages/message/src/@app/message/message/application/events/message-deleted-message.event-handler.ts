import { MessageDeletedMessageEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedMessageEvent)
export class MessageDeletedMessageEventHandler implements IEventHandler<MessageDeletedMessageEvent>
{
    handle(event: MessageDeletedMessageEvent): void
    {
        // console.log('MessageDeletedMessageEvent: ', event);
    }
}
