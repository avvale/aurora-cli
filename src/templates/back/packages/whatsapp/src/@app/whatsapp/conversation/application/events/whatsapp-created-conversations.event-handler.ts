import { WhatsappCreatedConversationsEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappCreatedConversationsEvent)
export class WhatsappCreatedConversationsEventHandler
  implements IEventHandler<WhatsappCreatedConversationsEvent>
{
  handle(event: WhatsappCreatedConversationsEvent): void {
    // console.log('CreatedConversationsEvent: ', event);
  }
}
