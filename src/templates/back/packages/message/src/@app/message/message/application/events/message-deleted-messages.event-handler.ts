import { MessageDeletedMessagesEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedMessagesEvent)
export class MessageDeletedMessagesEventHandler
  implements IEventHandler<MessageDeletedMessagesEvent>
{
  handle(event: MessageDeletedMessagesEvent): void {
    // console.log('DeletedMessagesEvent: ', event);
  }
}
