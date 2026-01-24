import { MessageCreatedInboxEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedInboxEvent)
export class MessageCreatedInboxEventHandler
  implements IEventHandler<MessageCreatedInboxEvent>
{
  handle(event: MessageCreatedInboxEvent): void {
    // console.log('MessageCreatedInboxEvent: ', event);
  }
}
