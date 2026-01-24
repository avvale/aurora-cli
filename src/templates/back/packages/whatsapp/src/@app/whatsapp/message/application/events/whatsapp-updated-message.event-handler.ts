import { WhatsappUpdatedMessageEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedMessageEvent)
export class WhatsappUpdatedMessageEventHandler
  implements IEventHandler<WhatsappUpdatedMessageEvent>
{
  handle(event: WhatsappUpdatedMessageEvent): void {
    // console.log('UpdatedMessageEvent: ', event);
  }
}
