import { MessageUpdatedAndIncrementedMessagesEvent } from '@app/message/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedAndIncrementedMessagesEvent)
export class MessageUpdatedAndIncrementedMessagesEventHandler
  implements IEventHandler<MessageUpdatedAndIncrementedMessagesEvent>
{
  handle(event: MessageUpdatedAndIncrementedMessagesEvent): void {
    // console.log('MessageUpdatedAndIncrementedMessagesEvent: ', event);
  }
}
