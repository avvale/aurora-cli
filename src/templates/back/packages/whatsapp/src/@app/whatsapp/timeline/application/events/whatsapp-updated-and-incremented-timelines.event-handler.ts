import { WhatsappUpdatedAndIncrementedTimelinesEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedAndIncrementedTimelinesEvent)
export class WhatsappUpdatedAndIncrementedTimelinesEventHandler
  implements IEventHandler<WhatsappUpdatedAndIncrementedTimelinesEvent>
{
  handle(event: WhatsappUpdatedAndIncrementedTimelinesEvent): void {
    // console.log('WhatsappUpdatedAndIncrementedTimelinesEvent: ', event);
  }
}
