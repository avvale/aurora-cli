import { WhatsappUpdatedConversationsEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedConversationsEvent)
export class WhatsappUpdatedConversationsEventHandler
  implements IEventHandler<WhatsappUpdatedConversationsEvent>
{
  handle(event: WhatsappUpdatedConversationsEvent): void {
    // console.log('WhatsappUpdatedConversationsEvent: ', event);
  }
}
