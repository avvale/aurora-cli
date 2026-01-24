import { WhatsappCreatedTimelineEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappCreatedTimelineEvent)
export class WhatsappCreatedTimelineEventHandler
  implements IEventHandler<WhatsappCreatedTimelineEvent>
{
  handle(event: WhatsappCreatedTimelineEvent): void {
    // console.log('WhatsappCreatedTimelineEvent: ', event);
  }
}
