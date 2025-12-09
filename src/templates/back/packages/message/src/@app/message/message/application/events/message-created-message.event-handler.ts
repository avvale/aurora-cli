import { MessageCreatedMessageEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedMessageEvent)
export class MessageCreatedMessageEventHandler
    implements IEventHandler<MessageCreatedMessageEvent>
{
    handle(event: MessageCreatedMessageEvent): void {
        // console.log('MessageCreatedMessageEvent: ', event);
    }
}
