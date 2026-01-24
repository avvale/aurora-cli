import { WhatsappDeletedMessageEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappDeletedMessageEvent)
export class WhatsappDeletedMessageEventHandler
  implements IEventHandler<WhatsappDeletedMessageEvent>
{
  handle(event: WhatsappDeletedMessageEvent): void {
    // console.log('WhatsappDeletedMessageEvent: ', event);
  }
}
