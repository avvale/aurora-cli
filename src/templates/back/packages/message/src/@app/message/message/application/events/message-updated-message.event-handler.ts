import { MessageUpdatedMessageEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedMessageEvent)
export class MessageUpdatedMessageEventHandler implements IEventHandler<MessageUpdatedMessageEvent>
{
    handle(event: MessageUpdatedMessageEvent): void
    {
        // console.log('UpdatedMessageEvent: ', event);
    }
}
