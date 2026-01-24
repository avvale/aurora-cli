import { MessageUpdatedInboxEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedInboxEvent)
export class MessageUpdatedInboxEventHandler
  implements IEventHandler<MessageUpdatedInboxEvent>
{
  handle(event: MessageUpdatedInboxEvent): void {
    // console.log('UpdatedInboxEvent: ', event);
  }
}
