import { MessageDeletedInboxEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedInboxEvent)
export class MessageDeletedInboxEventHandler
  implements IEventHandler<MessageDeletedInboxEvent>
{
  handle(event: MessageDeletedInboxEvent): void {
    // console.log('MessageDeletedInboxEvent: ', event);
  }
}
