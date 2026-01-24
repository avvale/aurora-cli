import { WhatsappCreatedMessageEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappCreatedMessageEvent)
export class WhatsappCreatedMessageEventHandler
  implements IEventHandler<WhatsappCreatedMessageEvent>
{
  handle(event: WhatsappCreatedMessageEvent): void {
    // console.log('WhatsappCreatedMessageEvent: ', event);
  }
}
