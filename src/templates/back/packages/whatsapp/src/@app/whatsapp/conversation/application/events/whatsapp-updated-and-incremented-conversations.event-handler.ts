import { WhatsappUpdatedAndIncrementedConversationsEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedAndIncrementedConversationsEvent)
export class WhatsappUpdatedAndIncrementedConversationsEventHandler
  implements IEventHandler<WhatsappUpdatedAndIncrementedConversationsEvent>
{
  handle(event: WhatsappUpdatedAndIncrementedConversationsEvent): void {
    // console.log('WhatsappUpdatedAndIncrementedConversationsEvent: ', event);
  }
}
